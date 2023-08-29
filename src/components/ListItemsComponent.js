
import { useEffect, useState } from "react";
import ItemServices from "./services/ItemServices";
import { Link, useNavigate } from "react-router-dom";
import Utility from "./services/Utility";



function ListItemsComponent() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllItems();
    }, [])

    useEffect(() => {
        ItemServices.getAllItems().then((response) => {
            setItems(response.data)
            console.log(response.data);
        }).catch(error => { console.log(error) })
    }, [])


    function getAllItems() {

        ItemServices.getAllItems().then((response) => {
            setItems(response.data)
            console.log(response.data);
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


    function markSold(id) {
        console.log(`the id is ${id} for sold`)
        ItemServices.markItemAsSoldById(id).then(
            (response) => {
                console.log(response.data);
                getAllItems();
            }
        ).catch(error => {
            console.log(error);
        })
    };


    return (
        <div className="container">
            <h2 className="text-center">Items</h2>
            <Link to={"/add-item"} className="btn btn-primary mb-2">Add Item</Link>



            <table className="table table-secondary table-bordered table-hover rounded rounded-3 overflow-hidden">
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
                                <td>{item.price}</td>
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
                                                value={item.isPurchased}
                                                onChange={() => {markSold(item.id)}}
                                            />

                                        </div>


                                        <Link to={`/edit-item/${item.id}`} className="btn btn-info">Update</Link>
                                        <button className="btn btn-danger" onClick={() => { deleteItem(item.id) }}>Delete</button>
                                        {/* <button className="btn btn-success" onClick={() => { markSold(item.id) }}>Mark As Sold</button> */}

                                    </td>

                                }
                            </tr>


                        )
                    }
                </tbody>


            </table>
        </div >

    )



}

export default ListItemsComponent;