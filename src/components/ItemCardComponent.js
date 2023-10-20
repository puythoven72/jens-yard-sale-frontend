import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import ItemServices from "./services/ItemServices";
import Utility from "./services/Utility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'

function ItemCardComponent(props) {

  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    console.log(props.item.id + " IS CARD ID");
    getItemPrimaryImage(props.item.id);
  }, [props])

  async function getItemPrimaryImage(id) {
    await ItemServices.getPrimaryItemImage(props.item.id).then(response => {

      setImagePath(`../../doc-uploads/${id}/${response.data.name}`);

    }).catch(error => console.log(error))
  }

  console.log(props.item.id);
  return (
    <Col className="p-1 "  >
      <Card style={{ width: '18rem', backgroundColor: '#f0eeed', color: "#AA422F" }}  >
        <Card.Img src={imagePath} width="100%" height="100%" className="img-thumbnail" />
        {/* 
      <Card style={{ width: '18rem', backgroundColor: '#f0eeed', color: "#AA422F" }} className="p-2 mx-auto h-100" >
        <Card.Img variant="top" src={imagePath} thumbnail width="150" height="150" /> */}
        <Card.Body>
          <Card.Title>{props.item.name}</Card.Title>
          <Card.Text>
            {props.item.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}>
          <ListGroup.Item style={{ backgroundColor: '#f0eeed', color: "#AA422F" }} ><strong>Category:</strong > {props.item.category} </ListGroup.Item>
          <ListGroup.Item style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}  ><strong>Condition:</strong> {props.item.condition}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <strong>Price:</strong> {Utility.formatCurrency(props.item.price)}
        </Card.Body>
        <Card.Footer>
          <Link to={`/displayItem`} state={props.item} style={{ color: "#AA422F" }}>
            Details
          </Link>
        </Card.Footer>
      </Card>
    </Col>

  )


}

export default ItemCardComponent;