import { Container, Row, Col } from "react-bootstrap";

function ImageCardComponent(props) {
    let path = props.path
    console.log(props.imageData);
    let iData = JSON.parse(props.imageData);





    return (
        <Col className="  card col-md-2  m-2 text-center" >

            <img src={path} alt="uploaded" width="150" height="150" />
            <div class="card-body">
                {iData.primary ==true ?
                    <p class="card-text">Image Is Primary Image.</p>
                    :
                    <a href="#" class="btn btn-primary">Set As Primary</a>


                }


            </div>

        </Col>


    )


}

export default ImageCardComponent;