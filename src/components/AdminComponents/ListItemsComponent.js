
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemServices from "../services/ItemServices";
import { Link, useNavigate } from "react-router-dom";
import Utility from "../services/Utility";
import AuthServices from "../services/AuthServices";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../css/listitem.css"


function ListItemsComponent() {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setSoldItem("");
    };

    const handleShow = (id) => {
        setShow(true);
        setSoldItem(id);
    };
    const [items, setItems] = useState([]);
    const [soldItem, setSoldItem] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getAllItems();
    }, [])

    // useEffect(() => {
    //     ItemServices.getAllItems().then((response) => {
    //         setItems(response.data)
    //         console.log(response.data);
    //     }).catch(error => { console.log(error) })
    // }, [])


    function getAllItems() {

        ItemServices.getAllItems().then((response) => {
            setItems(response.data)
            console.log(response.data);
            console.log("FINISHING GETTING ITEMS");
        }).catch(error => { console.log(error) })
    }


    function deleteItem(id) {
        console.log(`the id is ${id}`)
        ItemServices.deleteItemById(id).then(
            (response) => {
                console.log(response.data);
                getAllItems();
            }
        ).catch(error => {
            console.log(error);
        })
    }


    function markSold(item) {
        console.log(`the id is ${item.id} for sold`)
        if (item) {
            let id = item.id;
            ItemServices.markItemAsSoldById(id).then(
                (response) => {
                    console.log(response.data);
                    getAllItems();
                }
            ).catch(error => {
                console.log(error);
            })
        }
        handleClose();
    };

    // function cancelMarkAsSold(sItem){
    //     const item = items.find(({ id }) =>id === sItem.id);
    //     if(item !== "undefined"){
    //         item.purchased = false;
    //     }
    //     handleClose();
    // }


    return (
        <div className="container" style={{ backgroundColor: '#F4DFB6' }}>
            <h2 className="text-center">Items</h2>
            <div className=" d-flex justify-content-between">
            <Link to={"/admin/add-item"} className="btn mb-2" variant="btn" style={{ backgroundColor: '#6b5e51', color: "#f0eeed" }}  >Add Item</Link>
            </div>
           


            <div class="table-responsive">
                <table className="table  table-secondary table-bordered table-hover rounded rounded-3 overflow-hidden">
                    <thead className="table-dark">
                        <tr>

                            <th>Item</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Condition</th>
                            <th>Asking Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(item =>
                                <tr key={item.id}>
                                    <td>{item.name} {item.id}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td>{item.condition}</td>
                                    <td>{Utility.formatCurrency(item.price)}</td>
                                    <td>{item.saleStatus}</td>
                                    {item.saleStatus === "Sold" ?
                                        <td>
                                            Item Sold On: {Utility.formatDate(item.purchaseDate)}

                                        </td> :
                                        <td>

                                            <div className="text-end" >
                                                <small className="text-end">Mark Sold </small>
                                                <input
                                                    className="form-check-input text-end" type="checkbox" id="markSold"
                                                    label="Mark As Sold"
                                                    value={item.purchased}
                                                    checked={item.purchased}
                                                    // onChange={() => { markSold(item.id) }}
                                                    onClick={e => { handleShow(item) }}
                                                />

                                                <>

                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton style={{ backgroundColor: '#6b5e51',color:"#f0eeed" }}>
                                                            <Modal.Title>Mark {soldItem.name} As Sold?</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body style={{ backgroundColor: '#F4DFB6' }}> Warning this cannot be un-done!</Modal.Body>
                                                        <Modal.Footer style={{ backgroundColor: '#F4DFB6' }} > 
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Close
                                                            </Button>
                                                            <Button variant="btn" onClick={() => { markSold(soldItem) }}  style={{ backgroundColor: '#6b5e51',color:"#f0eeed" }}>
                                                                Mark As Sold
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </>

                                            </div>

                                            <div className="row ">
                                                <div className="col-lg-6 col-sm-6 p-1" >
                                                    <Link to={`/admin/edit-item/${item.id}`} className="btn" variant="btn" style={{ backgroundColor: '#6b5e51', color: "#f0eeed" }}>Update</Link>
                                                </div>

                                                <div className="col-lg-6 col-sm-6 p-1">
                                                    <button className="btn btn-secondary" onClick={() => { deleteItem(item.id) }}>Delete</button>
                                                    {/* <button className="btn btn-success" onClick={() => { markSold(item.id) }}>Mark As Sold</button> */}
                                                </div>
                                            </div>


                                        </td>

                                    }
                                </tr>


                            )
                        }
                    </tbody>


                </table>

            </div>



        </div >

    )



}

export default ListItemsComponent;