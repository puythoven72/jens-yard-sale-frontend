import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ItemServices from "./services/ItemServices";
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'
import Dropdown from "./services/Dropdown";

function CreateItemComponent() {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    //used for options
    const [allStatus, setAllStatus] = useState([]);
    const [allConditions, setAllConditions] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    

    const options = async () => {
        console.log("in options");
        await ItemServices.getAllSalesStatusSelections().then(
            (response) => {
                setAllStatus(response.data)
                console.log(response.data[0].salesStatus + " IS RESPONSE");
            }
        ).catch(error => {
            console.log(error);
        })

        await ItemServices.getAllConditionSelections().then(
            (response) => {
                setAllConditions(response.data)
                console.log(response.data[0].salesStatus + " IS RESPONSE");
            }

        ).catch(error => {
            console.log(error);
        })

        await ItemServices.getAllCategorySelections().then(
            (response) => {
                setAllCategories(response.data)
                console.log(response.data[0].salesStatus + " IS RESPONSE");
            }

        ).catch(error => {
            console.log(error);
        })
    };



    function getItemByID(id) {
        ItemServices.getItemById(id).then(
            (response) => {
                if (id) {
                    setForm({
                        form,
                        ["name"]: response.data.name,
                        ["description"]: response.data.description,
                        ["price"]: response.data.price,
                        ["category"]: response.data.category,
                        ["condition"]: response.data.condition,
                        ["saleStatus"]: response.data.saleStatus
                    }
                    )
                }

            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }




    useEffect(() => {
        if (id) {
            getItemByID(id);
        }
        options();
    }
        , [])



    const title = () => {
        if (id) {
            return "Update Item";
        }
        return "Add Item";
    };


    const setField = (field, value) => {
        console.log(field + " IS THE FIELD");
        console.log(value + " IS THE VALUE");
        console.log(form + " IS FORM");
        setForm({
            ...form,
            [field]: value
        }
        )
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }



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
            newErrors.category = "Please Enter Item Category."
        }

        if (!condition) {
            newErrors.condition = "Please Enter Item Condition."
        }

        if (!price || price < 1) {
            newErrors.price = "Please Enter A  Valid Item Price."
        }

        if (!saleStatus) {
            newErrors.saleStatus = "Please Enter Item Status."
        }


        console.log(newErrors + " errors")
        return newErrors;
    }

    function saveUpdateItem(e) {
        e.preventDefault();
        console.log("FORM:" + JSON.stringify(form));
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            if (id) {
                ItemServices.updateItem(id, form).then((res) => {
                    console.log(res.data);
                    navigate("/");
                }
                ).catch((err) => {
                    console.error(err);
                });

            } else {

                ItemServices.createItem(form).then((res) => {
                    console.log(res.data)
                }
                ).catch((err) => {
                    console.error(err);
                });
            }
        }
    }

    return <div>
        <br /><br />
        <Container>
            <Row>
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">{title()}</h2>
                    <div className="card-body">
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter Item Name"
                                    onChange={e => { setField("name", e.target.value) }}
                                    value={form.name}
                                    defaultValue={""}
                                    isInvalid={!!errors.name} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group controlId="description">
                                <Form.Label>Item Description</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter Item Description"
                                    onChange={e => { setField("description", e.target.value) }}
                                    value={form.description}
                                    defaultValue={""}
                                    isInvalid={!!errors.description} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <div className="form-group mb-2">
                                <label className="form-label">Item Category</label>
                                <Dropdown options={allCategories} defaultval={form.category} setFieldStateValue={setField} form={form} field = {"category"} />
                            </div>

                            <div className="form-group mb-2">
                                <label className="form-label">Item Condition</label>
                                <Dropdown options={allConditions} defaultval={form.condition} setFieldStateValue={setField} form={form} field = {"condition"}  />
                            </div>

                            <Form.Group controlId="price">
                                <Form.Label>Item Price</Form.Label>
                                <Form.Control type="number"
                                    placeholder="Enter Item Price"
                                    onChange={e => { setField("price", e.target.value) }}
                                    value={form.price}
                                    defaultValue={0}
                                   
                                    isInvalid={!!errors.price} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </Form.Group>



                            <div className="form-group mb-2">
                                <label className="form-label">Item Sales Status</label>
                                <Dropdown options={allStatus} defaultval={form.saleStatus} setFieldStateValue={setField} form={form} field = {"saleStatus"} />
                            </div>
                            <div className="row gy-2">
                                <Col className="sm-4 col-md-12">
                                    <Row>
                                        <Button variant="btn btn-success" type="submit" onClick={saveUpdateItem}>
                                            Save
                                        </Button>
                                    </Row>
                                </Col>
                                <Col className=" col-12">
                                    <Row >
                                        <Link to={"/"} className="btn btn-danger">Cancel</Link>
                                    </Row>

                                </Col>
                            </div>
                        </Form>

                    </div>
                </div>
            </Row>
        </Container>
    </div>
}

export default CreateItemComponent;