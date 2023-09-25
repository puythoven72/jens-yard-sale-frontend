import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemServices from "../services/ItemServices";

import Image from 'react-bootstrap/Image';

function ImageCardComponent(props) {
    let path = props.path;

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
        <Col lg={3} className="center-text m-1">
            <Card style={{ width: '10rem' }}>
                {iData.primary === true ?
                    <Card.Header>Primary</Card.Header>
                    :
                    null
                }
                <Card.Title className="p-1">{iData.name}</Card.Title>
               
                <Card.Body>
                <Image src={path} alt={iData.name} thumbnail  />
                    {iData.primary === true ?
                        null
                        :
                        <>
                            <div className="row gy-2">
                                <Col className=" col-12">
                                    <Row>
                                        <Button onClick={() => markAsPrimary()} className="btn btn-primary">Primary</Button>
                                    </Row>
                                </Col>

                                <Col className=" col-12">
                                    <Row>
                                        <Button onClick={() => deleteImageById()} className="btn btn-danger">Delete</Button>
                                    </Row>
                                </Col>
                            </div>
                        </>

                    }


                </Card.Body>

            </Card>


          
        </Col>


    )


}

export default ImageCardComponent;