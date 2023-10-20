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
        <Col lg={3} className="center-text m-1 ">



            
            <Card style={{ width: '10rem', backgroundColor: '#f0eeed', color: "#AA422F" }} className="h-100" >
                {iData.primary === true ?
                    <Card.Header><strong>Primary</strong></Card.Header>
                    :
                    null
                }
                <Card.Title className="p-1 fs-6">{iData.name}</Card.Title>
               
                <Card.Body className="">
                {/* <Image src={path} alt={iData.name} width="100%" height="100%" className="img-thumbnail"  />  */}
                <Card.Img variant="top" src={path} alt={iData.name}  width="100%" height="100%" className="img-thumbnail" /> 
                    {iData.primary === true ?
                        null
                        :
                        <>
                            {/* <div className="row gy-2 mt-auto">
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
                            </div> */}
                            <Card.Footer >
                            <Col className=" col-12 pt-1" style={{ width: '100%'}}>
                                    <Row>
                                        <Button onClick={() => markAsPrimary()} className="btn btn-primary">Primary</Button>
                                    </Row>
                                </Col>

                                <Col className=" col-12 pt-1">
                                    <Row>
                                        <Button onClick={() => deleteImageById()} className="btn btn-danger">Delete</Button>
                                    </Row>
                                </Col>
                            </Card.Footer>
                        </>

                    }


                </Card.Body>

            </Card>


          
        </Col>


    )


}

export default ImageCardComponent;