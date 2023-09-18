import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ItemServices from "./services/ItemServices";
import { useEffect, useState } from "react";
import ImageUploadComponent from "./ImageUploadComponent";


function AddImagesComponents(){


    const { id } = useParams();
    const [uploadProgress, setUploadProgress] = useState("getUpLoad");
    const [imageUrl, setImageUrl] = useState(undefined);
    const [imgErrorMessage, setImgErrorMessage] = useState("");


    const content = () => {

        switch (uploadProgress) {
          case "getUpLoad":
            return <ImageUploadComponent onImageChange={onImageChange} testProps={"TESTING"} />;
          case "upLoading":
            return <div>Uploading....</div>;
          case "uploaded":
            return (<Container>
              <Row>
                <Col className=" col-1 mx-auto">
                  <img src={imageUrl} alt="uploaded" width="150" height="150" />
                </Col>
              </Row>
    
            </Container>);
    
          case "uploadError":
            return (
              <>
                <div>Error message= {imgErrorMessage}</div>
                <div> </div>
              </>
            );
        }
    
      };



      const onImageChange = async (failedImages, successImages) => {
        console.log("IMAGE CHANGED");
        setUploadProgress('upLoading');
    
    
        try {
          console.log('successImages', successImages);
          const parts = successImages[0].split(";");
          // const mime = parts[0].split(":")[1];
          const name = parts[1].split("=")[1];
          // const data = parts[2];
          let blob = dataURItoBlob(successImages[0]);
    
          console.log(id + " IMAGE ID");
          let file = new FormData();
          file.append("file", blob, name);
          file.append("isMain", true)
          file.append("itemId", id)
    
          await ItemServices.createItemImage(file);
          setImageUrl(`./doc-uploads/${name}`);
          setUploadProgress('uploaded');
        }
        catch (error) {
          console.log("error in upload", error);
          setImgErrorMessage(error.message);
          setUploadProgress('uploadError');
        }
    
      };


      function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
        else
          // byteString = unescape(dataURI.split(',')[1]);
    
          byteString = encodeURI(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        console.log(mimeString + " mimeString");
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ia], { type: mimeString });
      }




    return(

        <div>
            PICTURES {id}

            {content()}
            


        </div>


    )




}


export default AddImagesComponents