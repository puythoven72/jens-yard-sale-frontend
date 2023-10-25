import { Container, Row, Col, Button, Card,  CardGroup } from "react-bootstrap";
function Test(){


        return(

            <CardGroup>
            <Card className="card d-flex flex-column">
              <Card.Img src={"../../doc-uploads/62/testdog2.jpg"} />
              <Card.Body className="d-flex flex-column justify-content-end align-items-center">
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          
            <Card className="card d-flex flex-column">
              <Card.Img src={"../../doc-uploads/57/testdog2.jpg"} />
              <Card.Body className="d-flex flex-column justify-content-end align-items-center">
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          
            <Card className="card d-flex flex-column">
              <Card.Img src={"../../doc-uploads/60/image.jpg"} />
              <Card.Body className="d-flex flex-column justify-content-end align-items-center">
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </CardGroup>

        )

}
export default Test;