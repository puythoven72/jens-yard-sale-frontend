
import { Container, Row, Col, HorizontalRule } from "react-bootstrap";
import "../App.css";
import yardBanner from "../assets/images/yardBanner.png";


function HomeComponent() {

  return (

    <div fluid className="homeBanner " style={{ backgroundImage: `url(${yardBanner})` }}>
      <Row  >
        <Col className="pt-3 d-flex justify-content-center" style={{ color: "#f0eeed" }}  >
          <strong>Welcome</strong>
        </Col>
       
      </Row>

      <Row>
      <Col className="d-flex justify-content-center" style={{ color: "#f0eeed" }}  >
        <section>If Interested in any items send me an email to: stuff@aol.com</section>
        </Col>
      </Row>

      <hr class="mt-1"
          style={{

            backgroundColor: "#F4DFB6",
            height: "2px"
          }} />

    </div>

  )


}
export default HomeComponent;