import { Container, Row, Col, Button } from "react-bootstrap";
import ItemServices from "../services/ItemServices";
import { useEffect, useState } from "react";

function ImageCardComponent(props) {
    let path = props.path
  
    let iData = JSON.parse(props.imageData);
    // console.log(JSON.stringify(iData));

    async function markAsPrimary() {
       
        await ItemServices.markImageAsPrimary(iData.id).then(
            (res) => {
                props.setItemImageUpdate(`primary-${iData.id}`)
            }
        ).catch(error => {
            console.log(error);
        })
    };


    async function deleteImageById() {
        await ItemServices.deleteImageById(iData.id).then(
            (res) => {
                
                props.setItemImageUpdate(`delete-${iData.id}`)
            }
        ).catch((error) => { console.log(error); })

    }

    return (
        <Col className=" card col-md-2  col-sm-1 m-2 text-center" >

            <img src={path} alt="uploaded" width="150" height="150" />
            <div class="card-body">
                {iData.primary === true ?
                    <p class="card-text">Primary</p>
                    :
                    <><Row className="mt-2">
                        <Col>
                            <Button onClick={() => markAsPrimary()} className="btn btn-primary">Primary</Button>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Button onClick={() => deleteImageById()} className="btn btn-danger">Delete</Button>
                        </Col>

                    </Row>

                    </>

                }


            </div>

        </Col>


    )


}

export default ImageCardComponent;