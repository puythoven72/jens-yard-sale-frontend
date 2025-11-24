import { Container, Row, Col, Button, Card, ListGroup, CardGroup } from "react-bootstrap";
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
   
    <Card className="card d-flex flex-column " style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}>

      <div class="text-center ">
        <Card.Img src={imagePath} className="img-thumbnail " alt={props.item.description} style={{ width: '15rem' }} />
      </div>

      <Card.Body className="d-flex flex-column justify-content-end align-items-center">
        <Card.Title ><span className="defaultfontColor">{props.item.name}</span></Card.Title>
        <ListGroup className="list-group-flush " style={{ backgroundColor: '#f0eeed' }}>
          <ListGroup.Item style={{ backgroundColor: '#f0eeed' }} ><span className="defaultfontColor"><strong>Category:</strong > {props.item.category}</span> </ListGroup.Item>
          <ListGroup.Item style={{ backgroundColor: '#f0eeed' }}  ><span className="defaultfontColor"><strong>Condition:</strong> {props.item.condition}</span></ListGroup.Item>
        </ListGroup>

        <Card.Body>
          <span className="defaultfontColor"> <strong>Price:</strong> {Utility.formatCurrency(props.item.price)}</span>
        </Card.Body>
        <Button as={Link} to={`/displayItem`} state={props.item} style={{ backgroundColor: '#6b5e51', color: "#f0eeed" }} variant="Secondary" className="w-100 " >
            Details
        </Button>

      </Card.Body>

    </Card>
    
  )


}

export default ItemCardComponent;