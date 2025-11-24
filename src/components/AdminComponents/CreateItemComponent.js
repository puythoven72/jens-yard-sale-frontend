import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ItemServices from "../services/ItemServices";

import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "../services/Dropdown";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Utility from "../services/Utility";

function CreateItemComponent() {
  const saveLabel = "Saved";
  //const deleteLabel = "Deleted";
  const categoryCode = Utility.getCategoryCode();
  const conditionCode = Utility.getConditonCode();
  //const salesStatusCode = Utility.getSalesStatusCode;

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [newSavedForm, setNewSavedForm] = useState(false);

  //used for options
  const [allSelections, setAllSelections] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [allConditions, setAllConditions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);



  //used for catagry and condition modal
  const [currentDropDownField, setCurrentDropDownField] = useState();
  const [currentDropDownValue, setCurrentDropDownValue] = useState("");
  const [show, setShow] = useState(false);

  //used in save delete conformation modal
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showSaveConfirmCondition, setShowSaveConfirmCondition] =
    useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [confirmActionItem, setConfirmActionItem] = useState("");
  const [showDeleteSelection, setShowDeleteSelection] = useState(false);


  const handleClose = () => {
    setCurrentDropDownField("");
    setCurrentDropDownValue("");
    setShow(false);
  }
  const handleShow = (dropDownVal) => {
   // console.log(dropDownVal + " get the val")
    setCurrentDropDownField(dropDownVal);
    setShow(true);
  };

  function handleCloseSaveConfirm() {
    setShowSaveConfirm(false);
    setShowSaveConfirmCondition(false);
    setConfirmAction("");
    setConfirmActionItem("");
  }

  function handleShowDeleteSelection(dropDownVal) {
   // console.log(dropDownVal);
    setCurrentDropDownField(dropDownVal);
    setShowDeleteSelection(true);
  }

  function handleCloseDeleteSelection() {
    setCurrentDropDownField();
    setShowDeleteSelection(false);
  }


  const navigate = useNavigate();
  //id passed in from item list for updates
  const { id } = useParams();
  //this itemID will be passed to the image save
  const [itemID, setItemId] = useState();

  const [uploadProgress, setUploadProgress] = useState("getUpLoad");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [imgErrorMessage, setImgErrorMessage] = useState("");



  //get categories from all Items
  async function setCategories() {
    const cats = [];
    let seen = new Set();
    await ItemServices.getAllItems()
      .then((response) => {
        let allitems = response.data;
        for (const i of allitems) {
          let categoryValue = i.category;
          if (!seen.has(categoryValue)) {
            seen.add(categoryValue);
            cats.push({
              id: i.id,
              selectionValue: i.category,
              selectionType: 300,
            });
          }
        }
        setAllCategories(cats);
       // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });



    const sessionCategories = JSON.parse(sessionStorage.getItem("sessionCat"));
    if (sessionCategories) {
      setAllCategories(sessionCategories);
    }
  }

  //get all  drop down values
  const options = async () => {

    let condList = [];
    let selectionsList = [];
    let salesStatusList = [];
    await ItemServices.getAllSelections()
      .then((response) => {
        setAllSelections(response.data);
        response.data.map((x) => {
          selectionsList.push(x);
          switch (x.selectionType) {
            case conditionCode:
              condList.push(x);
              break;
            default:
              salesStatusList.push(x);
          }
        });
        setAllConditions(condList);
        setAllStatus(salesStatusList);

        setCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewCondition = () => {
    setAllCategories([
      ...allCategories,
      { id: -1, selectionValue: "All", selectionType: 100 },
    ]);
  };

  async function getItemByID(id) {
    await ItemServices.getItemById(id)
      .then((response) => {
        if (id) {
          setForm({
            form,
            ["name"]: response.data.name,
            ["description"]: response.data.description,
            ["price"]: response.data.price,
            ["category"]: response.data.category,
            ["condition"]: response.data.condition,
            ["saleStatus"]: response.data.saleStatus,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (id) {
      getItemByID(id);
      setItemId(id);
    }

    options();
  }, [currentDropDownField, showSaveConfirm]);
  //currentDropDownField, showSaveConfirm
  const title = () => {
    if (id) {
      return "Update Item";
    }
    return "Add Item";
  };

  const imageButtonTitle = () => {
    if (id) {
      return "Update Images";
    }
    return "Add Images";
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validateForm = () => {
    const { name, description, category, condition, price, saleStatus } = form;
    let newErrors = {};
   // console.log(form);

    if (!name) {
      newErrors.name = "Please Enter Item Name.";
    }
    if (!description) {
      newErrors.description = "Please Enter Item Description.";
    }

    if (!category) {
      newErrors.category = "Please Enter Item Category.";
    }

    if (!condition) {
      newErrors.condition = "Please Enter Item Condition.";
    }

    if (!price || price < 1) {
      newErrors.price = "Please Enter A  Valid Item Price.";
    }

    if (!saleStatus) {
      newErrors.saleStatus = "Please Enter Item Status.";
    }

    console.log(newErrors + " errors");
    return newErrors;
  };

  function saveUpdateItem(e) {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (id) {
        ItemServices.updateItem(id, form)
          .then((res) => {
           // console.log(res.data);
            navigate("/admin");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        ItemServices.createItem(form)
          .then((res) => {
          //  console.log(res.data);
            setItemId(res.data.id);
            setConfirmAction(saveLabel);
            setConfirmActionItem(form.name);
            setShowSaveConfirm(true);
            setShowSaveConfirmCondition(true);
            setNewSavedForm(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      sessionStorage.removeItem("sessionCat");
    }
  }

  function updateModalDropDownValue(addValue) {
   // console.log(currentDropDownField + " Is the current dropdown");
    setCurrentDropDownValue(addValue);
  }

  async function deleteDropDownSelection(id) {
    await ItemServices.deleteDropDownSelection(id)
      .then((response) => { })
      .catch((error) => {
        console.log(error);
      });

    options();

  }

  //function to add new categories or conditions to the drop downs
  function saveNewDropDownVal() {
    if (currentDropDownValue) {
      setConfirmActionItem(currentDropDownValue);
     // console.log(currentDropDownValue + " IS VALUE");
      const updateVal = Utility.formatProperCase(currentDropDownValue);
      var jsonArray = [];
      if (currentDropDownField === categoryCode) {
        const tempArray = [...allCategories, { selectionType: 300, selectionValue: updateVal },
        ]
        //store the categories in the session so when the page re loads we dont loose new categories
        sessionStorage.setItem("sessionCat", JSON.stringify(tempArray));
        setAllCategories([
          ...allCategories,
          { selectionType: 300, selectionValue: updateVal },
        ]);

      }
      if (currentDropDownField === conditionCode) {
        //have to get current Categories so when page refreshes we dont loose new categories
        var jsonObject = { selectionType: 200, selectionValue: updateVal };
        jsonArray.push(jsonObject);
        ItemServices.addNewCategory(jsonObject)
          .then((response) => {
           // console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    handleClose();
    setShowSaveConfirm(true);
    setConfirmAction(saveLabel);
  }

  return (
    <div>
      <Container style={{ backgroundColor: "#F4DFB6" }}>
        <Row>
          <div
            className="card col-md-6 offset-md-3 offset-md-3"
            style={{ backgroundColor: "#f0eeed", color: "#AA422F" }}
          >
            <h2 className="text-center defaultfontColor  mt-2">{title()}</h2>
            <div className="card-body">
              <Form controlId="price">
                <Form.Group controlId="name">
                  <Form.Label>
                    <span span className="defaultfontColor">
                      Item Name
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    onChange={(e) => {
                      setField("name", e.target.value);
                    }}
                    value={form.name}
                    defaultValue={""}
                    isInvalid={!!errors.name}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>
                    <span span className="defaultfontColor">
                      Item Description
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Item Description"
                    onChange={(e) => {
                      setField("description", e.target.value);
                    }}
                    value={form.description}
                    defaultValue={""}
                    isInvalid={!!errors.description}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="form-group mb-2">
                  <label className="form-label">
                    <span span className="defaultfontColor">
                      Item Category
                    </span>
                  </label>
                  <Dropdown
                    options={allCategories}
                    defaultval={form.category}
                    setFieldStateValue={setField}
                    form={form}
                    field={"category"}
                  />
                  <Row>
                    <Button
                      variant="btn mt-2"
                      style={{ backgroundColor: "#6b5e51", color: "#f0eeed" }}
                      onClick={() => {
                        handleShow(categoryCode);
                        // addNewCondition(categoryCode);
                      }}
                    >
                      Add Category
                    </Button>
                  </Row>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label defaultfontColor">
                    Item Condition
                  </label>
                  <Dropdown
                    options={allConditions}
                    defaultval={form.condition}
                    setFieldStateValue={setField}
                    form={form}
                    field={"condition"}
                  />
                  <Row>
                    <Button
                      variant="btn mt-2"
                      style={{ backgroundColor: "#6b5e51", color: "#f0eeed" }}
                      onClick={() => {
                        handleShow(conditionCode);
                      }}
                    >
                      Add Condition
                    </Button>

                    <Button
                      variant="btn mt-2"
                      style={{ backgroundColor: "#6b5e51", color: "#f0eeed" }}
                      onClick={() => {
                        handleShowDeleteSelection(conditionCode);
                      }}
                    >
                      Delete Condition
                    </Button>
                  </Row>
                </div>

                <Form.Group>
                  <Form.Label>
                    {" "}
                    <span className="defaultfontColor">Item Price</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Item Price"
                    onChange={(e) => {
                      setField("price", e.target.value);
                    }}
                    value={form.price}
                    defaultValue={0}
                    isInvalid={!!errors.price}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="form-group mb-2">
                  <label className="form-label defaultfontColor">
                    Item Sales Status
                  </label>
                  <Dropdown
                    options={allStatus}
                    defaultval={form.saleStatus}
                    setFieldStateValue={setField}
                    form={form}
                    field={"saleStatus"}
                  />
                </div>
                <div className="row gy-2">
                  <Col className="sm-4 col-md-12">
                    <Row>
                      <Button
                        variant="btn "
                        style={{ backgroundColor: "#6b5e51", color: "#f0eeed" }}
                        type="submit"
                        onClick={saveUpdateItem}
                      >
                        Save
                      </Button>
                    </Row>
                  </Col>

                  <div>
                    {itemID ? (
                      <Col className="sm-4 col-md-12">
                        <Row>
                          <Link
                            to={`/admin/add-images/${itemID}`}
                            className="btn "
                            style={{
                              backgroundColor: "#6b5e51",
                              color: "#f0eeed",
                            }}
                            state={{
                              from: "/admin/edit-item/" + { itemID },
                              body: { form },
                            }}
                          >
                            {imageButtonTitle()}
                          </Link>
                        </Row>
                      </Col>
                    ) : null}
                  </div>

                  {!newSavedForm ? (
                    <Col className=" col-12">
                      <Row>
                        <Link to={"/admin"} className="btn btn-secondary">
                          <span className="closeButton">Back</span>
                        </Link>
                      </Row>
                    </Col>
                  ) : null}
                </div>
              </Form>
            </div>
          </div>
        </Row>
      </Container>

      {/* Modal window to collect new dropdown values for category and condition */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#F4DFB6", color: "#AA422F" }}
          className="defaultfontColor"
        >
          <Modal.Title>

            {Utility.getSelectionType(currentDropDownField)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f0eeed", color: "#AA422F" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="defaultfontColor">
                {/* {currentDropDownField
                  ? currentDropDownField[0].toUpperCase() +
                  currentDropDownField.slice(1)
                  : ""} */}
                {Utility.getSelectionType(currentDropDownField)}
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  updateModalDropDownValue(e.target.value);
                }}
                placeholder="New value"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0eeed" }}>
          <Button variant="secondary" onClick={handleClose}>
            <span className="closeButton"> Close</span>
          </Button>

          <Button
            variant="btn"
            onClick={saveNewDropDownVal}
            style={{ backgroundColor: "#6b5e51", color: "#f0eeed" }}
          >
            
            Add {Utility.getSelectionType(currentDropDownField)}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal window to let user know action successful */}
      <Modal
        show={showSaveConfirmCondition}
        onHide={handleCloseSaveConfirm}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#F4DFB6", color: "#AA422F" }}
          className="defaultfontColor"
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {confirmAction}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f0eeed", color: "#AA422F" }}>
          <p>
            {Utility.formatProperCase(confirmActionItem)} has been succesfully{" "}
            {confirmAction.toLowerCase()}.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0eeed" }}>
          <Button variant="secondary" onClick={handleCloseSaveConfirm}>
            <span className="closeButton"> Close</span>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSaveConfirm}
        onHide={handleCloseSaveConfirm}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#F4DFB6", color: "#AA422F" }}
          className="defaultfontColor"
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {confirmAction}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f0eeed", color: "#AA422F" }}>
          <p>
            {Utility.formatProperCase(confirmActionItem)} has been succesfully{" "}
            {confirmAction.toLowerCase()}.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0eeed" }}>
          <Button variant="secondary" onClick={handleCloseSaveConfirm}>
            <span className="closeButton"> Close</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal window to delete dropdown selections */}
      <Modal
        show={showDeleteSelection}
        onHide={handleCloseDeleteSelection}
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#F4DFB6", color: "#AA422F" }}
          className="defaultfontColor"
        >
          <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f0eeed", color: "#AA422F" }}>
          <p>
            {Utility.getSelectionType(currentDropDownField)}
            <ListGroup>
              {allSelections.map((category) => {
                if (category.selectionType === currentDropDownField) {
                  return (
                    <ListGroup.Item>
                      <Row>
                        <Col>{category.selectionValue}</Col>
                        <Col className="d-flex justify-content-end">
                          <Button
                            onClick={() => {
                              deleteDropDownSelection(category.id);
                            }}
                            style={{
                              backgroundColor: "#6b5e51",
                              color: "#f0eeed",
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0eeed" }}>
          <Button variant="secondary" onClick={handleCloseDeleteSelection}>
            <span className="closeButton"> Close</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CreateItemComponent;
