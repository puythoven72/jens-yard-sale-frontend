import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import ItemServices from "./services/ItemServices";
import Utility from "./services/Utility";



function DisplayItemDetailsComponent() {

    const location = useLocation()

    const [primaryImageForItem, setPrimaryImageForItem] = useState([]);
    const [imagesForItem, setImagesForItem] = useState([]);
    const [displayImagesForItem, setDisplayImagesForItem] = useState([]);
    const item = location.state;


    useEffect(() => {
        if (primaryImageForItem.length === 0) {
            getItemImages();

        }

    }, [primaryImageForItem]);


    function markAsPrimary(imageData) {
        let allImages = [];

        for (let i = 0; i < imagesForItem.length; i++) {

            if (imagesForItem[i].id === imageData.id) {
                imagesForItem[i].primary = true;
                allImages.push(imagesForItem[i]);

            } else {
                imagesForItem[i].primary = false;
                allImages.push(imagesForItem[i]);
            }
        }
        parsePrimaryImage(allImages);
    }




    //runs initally to get the images for item from db
    const getItemImages = async () => {

        if (item.id) {
            let allImages = [];
            await ItemServices.getAllItemImages(item.id).then((res) => {
                //this is an array that will contain all items (reg items and primary) to hold
                setImagesForItem(res.data);
                //builds a new array list of images that will be displayed on the page
                res.data.map(
                    imageData => {
                        allImages.push(imageData);
                    }
                );
                parsePrimaryImage(allImages);
            }
            ).catch(error => console.log(error))
        }
    };


    function parsePrimaryImage(allImages) {

        allImages.filter((element) => {
            if (element.primary) {

                let index = allImages.indexOf(element);
                // remove the primary from the list
                if (index >= 0) {
                    allImages.splice(index, 1);
                }
                console.log([element]);
                setPrimaryImageForItem([element]);
            }
        })
        setDisplayImagesForItem(allImages);
    }


    return (
        <Container style={{ backgroundColor: '#F4DFB6' }} className="mb-2 " >

            <Row>
                {
                    primaryImageForItem.map((primaryItem) => {
                        let path = `../../doc-uploads/${primaryItem.itemId}/${primaryItem.name}`;
                        return (
                            <Col sm={8}>
                                <Card style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}  >
                                    <Card.Img variant="top" src={path} width="50%" height="50%" className="img-fluid" />

                                </Card>
                            </Col>
                        )
                    })
                }


                <Col sm={4} style={{ width: '25rem', backgroundColor: '#f0eeed', color: "#AA422F" }}  className=" d-flex flex-column justify-content-center fs-4"  >
                    <Row className="mt-2 ">
                        <Col className="display-2" >
                        <strong>   {item.name}</strong>
                        </Col>
                    </Row>
                   
                    <Row className="mt-2">
                        <Col>
                            <strong>Description:</strong>
                        </Col>
                        <Col>
                            {item.description}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <strong> Category:</strong>
                        </Col>
                        <Col>
                            {item.category}
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col>
                            <strong>Condition:</strong>
                        </Col>
                        <Col>
                            {item.condition}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <strong>Price:</strong>
                        </Col>
                        <Col>
                            {Utility.formatCurrency(item.price)}
                        </Col>
                    </Row>
                   
                </Col>
            </Row>


            <Row className=" justify-content-center mt-2"  >
                {
                    displayImagesForItem.map((item) => {

                        let path = `../../doc-uploads/${item.itemId}/${item.name}`;
                        return (
                            <Card xs={12} sm={4} md={4} style={{ width: '10rem', backgroundColor: '#f0eeed', color: "#AA422F" }} onClick={e => { markAsPrimary(item) }} >
                                <Card.Img src={path} width="100%" height="100%" className="img-thumbnail mt-1" />


                            </Card>
                        )
                    })
                }
            </Row>

        </Container>

    )

}


export default DisplayItemDetailsComponent;
