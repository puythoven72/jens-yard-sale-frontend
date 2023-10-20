import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ItemServices from "../services/ItemServices";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "../services/Dropdown";
import "../../App.css"




import Modal from 'react-bootstrap/Modal';
import Utility from "../services/Utility";




function CreateItemComponent() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  //used for options
  const [allStatus, setAllStatus] = useState([]);
  const [allConditions, setAllConditions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [currentDropDownField, setCurrentDropDownField] = useState("");
  const [currentDropDownValue, setCurrentDropDownValue] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setCurrentDropDownField("");
    setCurrentDropDownValue("");
    setShow(false);
  }
  const handleShow = (dropDownVal) => {
    console.log(dropDownVal + " get the val")
    setCurrentDropDownField(dropDownVal);
    setShow(true);
  };



  const navigate = useNavigate();
  //id passed in from item list for updates
  const { id } = useParams();
  //this itemID will be passed to the image save
  const [itemID, setItemId] = useState();

  const [uploadProgress, setUploadProgress] = useState("getUpLoad");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [imgErrorMessage, setImgErrorMessage] = useState("");

  const options = async () => {
    console.log("in options");
    await ItemServices.getAllSalesStatusSelections()
      .then((response) => {
        setAllStatus(response.data);
        console.log(response.data[0].salesStatus + " IS RESPONSE");
      })
      .catch((error) => {
        console.log(error);
      });

    await ItemServices.getAllConditionSelections()
      .then((response) => {
        setAllConditions(response.data);
        console.log(response.data[0].salesStatus + " IS RESPONSE");
      })
      .catch((error) => {
        console.log(error);
      });

    await ItemServices.getAllCategorySelections()
      .then((response) => {
        setAllCategories(response.data);
        console.log(response.data[0].salesStatus + " IS RESPONSE");
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, [currentDropDownField]);

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
    console.log(form);

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
            console.log(res.data);
            navigate("/admin");
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        ItemServices.createItem(form)
          .then((res) => {
            console.log(res.data);
            setItemId(res.data.id);

          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }


  function updateModalDropDownValue(addValue) {
    console.log(currentDropDownField + " Is the current dropdown");
    setCurrentDropDownValue(addValue);
  }



  function saveNewDropDownVal() {
    if (currentDropDownValue) {

     const updateVal =  Utility.formatProperCase(currentDropDownValue)
      var jsonArray = [];
      if (currentDropDownField === "category") {

        var jsonObject = { selectionType: 300, selectionValue: updateVal };
        jsonArray.push(jsonObject);

      }
      if (currentDropDownField === "condition") {
        var jsonObject = { selectionType: 200, selectionValue: updateVal };
        jsonArray.push(jsonObject);
      }


      ItemServices.addNewCategory(jsonObject).then((response) => {
        console.log(response.data);
      })
        .catch((err) => {
          console.log(err);
        })
    }




    //    setCurrentDropDownField("");
    //  setCurrentDropDownValue("");
    handleClose();
  }


  return (
    <div>
      <br />
      <br />
      <Container style={{ backgroundColor: '#F4DFB6' }} >
        <Row>
          <div className="card col-md-6 offset-md-3 offset-md-3" style={{ backgroundColor: '#f0eeed', color:"#AA422F"}}>
            <h2 className="text-center">{title()}</h2>
            <div className="card-body">
              <Form controlId="price" >
                <Form.Group controlId="name">
                  <Form.Label>Item Name</Form.Label>
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
                  <Form.Label>Item Description</Form.Label>
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
                  <label className="form-label">Item Category</label>
                  <Dropdown
                    options={allCategories}
                    defaultval={form.category}
                    setFieldStateValue={setField}
                    form={form}
                    field={"category"}
                  />
                <Button variant="btn" style={{ backgroundColor: '#6b5e51', color:"#f0eeed" }}  onClick={() => { handleShow("category") }}>
                    Add Category
                  </Button>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Item Condition</label>
                  <Dropdown
                    options={allConditions}
                    defaultval={form.condition}
                    setFieldStateValue={setField}
                    form={form}
                    field={"condition"}
                  />
                  <Button variant="btn" style={{ backgroundColor: '#6b5e51', color:"#f0eeed" }}  onClick={() => { handleShow("condition") }}>
                    Add Condition
                  </Button>

                </div>

                <Form.Group >
                  <Form.Label>Item Price</Form.Label>
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
                  <label className="form-label">Item Sales Status</label>
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
                        style={{ backgroundColor: '#6b5e51', color:"#f0eeed" }}
                        type="submit"
                        onClick={saveUpdateItem}>
                        Save
                      </Button>
                    </Row>
                  </Col>

                  <div>
                    {itemID ? (
                      <Col className="sm-4 col-md-12">
                        <Row>
                          <Link to={`/admin/add-images/${itemID}`} className="btn " 
                          style={{ backgroundColor: '#6b5e51', color:"#f0eeed" }}
                            state={{
                              from: "/admin/edit-item/" + { itemID },
                              body: { form }
                            }}>
                            {imageButtonTitle()}
                          </Link>
                        </Row>
                      </Col>
                    ) : (
                      null
                    )}
                  </div>


                  <Col className=" col-12">
                    <Row>
                      <Link to={"/admin"} className="btn btn-secondary">
                        Cancel
                      </Link>
                    </Row>
                  </Col>
                </div>
              </Form>
            </div>
          </div>
        </Row>
      </Container>




{/* Modal window to collect new dropdown values for category and condition */}

      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton style={{ backgroundColor: '#F4DFB6', color:"#AA422F" }}>
          <Modal.Title >{currentDropDownField ? `Add ${currentDropDownField[0].toUpperCase() + currentDropDownField.slice(1)}` : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f0eeed', color:"#AA422F"}}>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{currentDropDownField ? currentDropDownField[0].toUpperCase() + currentDropDownField.slice(1) : ""}</Form.Label>
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
        <Modal.Footer style={{ backgroundColor: '#f0eeed' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="btn" onClick={saveNewDropDownVal} style={{ backgroundColor: '#F4DFB6', color:"#AA422F" }} >  
            Add {currentDropDownField ? `Add ${currentDropDownField[0].toUpperCase() + currentDropDownField.slice(1)}` : ""}
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
}

export default CreateItemComponent;
