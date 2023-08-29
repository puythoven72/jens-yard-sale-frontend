import { useEffect, useState } from "react";
import ItemServices from "./services/ItemServices";
import Dropdown from "./services/Dropdown";
import { Form, useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom";
import Utility from "./services/Utility";
function CreateItemComponent() {


    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemCondition, setItemCondition] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemStatus, setItemStatus] = useState("");

    //used for options
    const [allStatus, setAllStatus] = useState([]);
    const [allConditions, setAllConditions] = useState([]);
    const [allCategories, setAllCategories] = useState([]);


    //used for form validation
    const [validated, setValidated] = useState(false);


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
                setItemName(response.data.name)
                setItemDescription(response.data.description)
                setItemCategory(response.data.category)
                setItemCondition(response.data.condition)
                setItemPrice(response.data.price)
                setItemStatus(response.data.saleStatus)
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

    function saveUpdateItem(e) {
        e.preventDefault();

        Utility.validateForm();

        const name = itemName;
        const description = itemDescription;
        const category = itemCategory;
        const condition = itemCondition;
        const price = itemPrice;
        const saleStatus = itemStatus;
        console.log(saleStatus);
        const item = { id, name, description, category, condition, price, saleStatus };
        console.log(item + " IS THE ITEM!!!");

        if (id) {
            ItemServices.updateItem(id, item).then((res) => {
                console.log(res.data);
                navigate("/");
            }
            ).catch((err) => {
                console.error(err);
            });

        } else {

            ItemServices.createItem(item).then((res) => {
                console.log(res.data)
            }
            ).catch((err) => {
                console.error(err);
            });
        }

    }

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">{title()}</h2>
                        <div className="card-body">

                            <form className="needs-validation" novalidate>
                                <div className="form-group mb-2">
                                    <label className="form-label">Item Name</label>
                                    <input type="text"
                                        placeholder="Enter Item Name"
                                        name="itemName" id="itemName"
                                        className="form-control"
                                        value={itemName}
                                        required
                                        onChange={e => setItemName(e.target.value)}>
                                    </input>
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Item Description</label>
                                    <input type="text"
                                        placeholder="Enter Item Description"
                                        name="itemDescription" id="itemDescription"
                                        className="form-control"
                                        value={itemDescription}
                                        onChange={(e) => setItemDescription(e.target.value)}>
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Item Category</label>
                                    {/* <input type="text"
                                        placeholder="Enter Item Category"
                                        name="itemCategory" id="itemCategory"
                                        className="form-control"
                                        value={itemCategory}
                                        onChange={(e) => setItemCategory(e.target.value)}>
                                    </input> */}
                                    <Dropdown options={allCategories} defaultval={itemCategory} setFieldStateValue={setItemCategory} />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Item Condition</label>
                                    {/* <input type="text"
                                        placeholder="Enter Item Condition"
                                        name="itemCondition" id="itemCondition"
                                        className="form-control"
                                        value={itemCondition}
                                        onChange={(e) => setItemCondition(e.target.value)}>
                                    </input> */}
                                    <Dropdown options={allConditions} defaultval={itemCondition} setFieldStateValue={setItemCondition} />
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Item Price</label>
                                    <input type="number"
                                        placeholder="Enter Item Price"
                                        name="itemPrice" id="itemPrice"
                                        className="form-control"
                                        value={itemPrice}
                                        onChange={(e) => setItemPrice(e.target.value)}
                                        data-type="currency"
                                    >
                                    </input>
                                </div>
                                {/* <div className="form-group mb-2">
                                    <label className="form-label">Status</label>
                                    <input type="text"
                                        placeholder="Choose Status"
                                        name="itemStatus" id="itemStatus"
                                        className="form-control"
                                        value={itemStatus}
                                        onChange={(e) => setItemStatus(e.target.value)}>
                                    </input> */}

                                <div className="form-group mb-2">
                                    <label className="form-label">Status</label>
                                    <Dropdown options={allStatus} defaultval={itemStatus} setFieldStateValue={setItemStatus} />
                                </div>
                                {/* </div> */}



                                <button className="btn btn-success" onClick={(e) => saveUpdateItem(e)} type="submit">Save</button>
                                <Link to={"/"} className="btn btn-danger">Cancel</Link>
                            </form>


                        </div>

                    </div>
                </div>
            </div>

        </div>
    )

}

export default CreateItemComponent;