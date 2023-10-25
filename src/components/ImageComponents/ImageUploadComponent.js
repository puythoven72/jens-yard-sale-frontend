
import { Container, Row, Col } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import ImageUpLoader from "react-images-upload";
import { useEffect, useState } from "react";


const ImageUploadComponent= props => (
    // const [uploadProgress, setUploadProgress] = useState("getUpLoad");
    // const [imageUrl, setImageUrl] = useState(undefined);
    // const [imgErrorMessage,setImgErrorMessage] = useState("");

  
        
            <Container style={{ backgroundColor: '#F4DFB6', color:"#f0eeed" }}>  
                <Row>
                    <div className="card col-md-6 offset-md-3 offset-md-3 " style={{ backgroundColor: '#F4DFB6', color:"#f0eeed" }}>
                        
                        <div className="card-body mt-2 mb-2" style={{ backgroundColor: '#f0eeed', color: "#AA422F" }}>
                            <Form>
                            <Form.Label className='center-text'>
                                
                                <p><strong>Upload Image For Item:</strong> {props.itemData.name}</p>
                                <p><strong>Description:</strong> {props.itemData.description}</p>
                            
                            </Form.Label>
                            <ImageUpLoader
                                key='file'
                                withIcon={true}
                                singleImage={true}
                                withPreview={true}
                                label='Maximum Size File:  5mb'
                                buttonText="Choose An Image"
                                onChange={props.onImageChange}
                                imageExtension={['.jpg','.png','.jpeg']}
                                name="file"
                                maxFileSize={5242880}/>
                               
                            {/* </ImageUpLoader> */}
                                
                            </Form>

                        </div>
                    </div>
                </Row>
            </Container>



       




    


);

export default ImageUploadComponent;