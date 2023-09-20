
import { Container, Row, Col } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import ImageUpLoader from "react-images-upload";
import { useEffect, useState } from "react";


const ImageUploadComponent= props => (
    // const [uploadProgress, setUploadProgress] = useState("getUpLoad");
    // const [imageUrl, setImageUrl] = useState(undefined);
    // const [imgErrorMessage,setImgErrorMessage] = useState("");

  
        <div>
            <Container>
                <Row>
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2 className="text-center">Upload Image</h2>
                        <div className="card-body">
                            <Form>
                            <Form.Label>Upload</Form.Label>
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



        </div>




    


);

export default ImageUploadComponent;