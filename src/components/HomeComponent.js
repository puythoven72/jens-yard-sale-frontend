
import { Container, Row, Col, HorizontalRule } from "react-bootstrap";
import "../App.css";
import yardBanner from "../assets/images/yardBanner.png";


function HomeComponent() {

  return (

    <div fluid className="homeBanner" style={{ backgroundImage: `url(${yardBanner})` }}>
      <Container style={{ backgroundColor: '#F4DFB6' }}>
        <Row >
          <Row  >
            <Col className=" d-flex justify-content-center"   >
              <h3>
                <strong className="">Welcome</strong>
              </h3>
            </Col>

          </Row>

          <Row>
            <Col className="d-flex justify-content-center "   >
              <section>If Interested in any items send me an email to: stuff@aol.com</section>
            </Col>
          </Row>

        </Row>

      </Container>



  

    </div>

  )


}
export default HomeComponent;