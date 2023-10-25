import { Container, Row, Col, Button, Card, ListGroup,CardGroup } from "react-bootstrap";
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

  console.log(props.item.id + " IS ID");
  console.log(imagePath + " IS PATH");
  return (
    // <CardGroup>



   
    <Card className="card d-flex flex-column" style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}>
    <Card.Img src={imagePath}  className="img-thumbnail" />
    <Card.Body className="d-flex flex-column justify-content-end align-items-center">
    <Card.Title>{props.item.name}</Card.Title>
    <ListGroup className="list-group-flush" style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}>
          <ListGroup.Item style={{ backgroundColor: '#f0eeed', color: "#AA422F" }} ><strong>Category:</strong > {props.item.category} </ListGroup.Item>
          <ListGroup.Item style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}  ><strong>Condition:</strong> {props.item.condition}</ListGroup.Item>
        </ListGroup>

        <Card.Body>
          <strong>Price:</strong> {Utility.formatCurrency(props.item.price)}
        </Card.Body>
        {/* <Card.Footer> */}
          
          <Button as={Link} to={`/displayItem`} state={props.item} style={{backgroundColor:"#F4DFB6", color: "#AA422F" }} variant="Secondary">Details</Button>
        {/* </Card.Footer> */}
    </Card.Body>
  </Card>
  // </CardGroup>
  )


}

export default ItemCardComponent;