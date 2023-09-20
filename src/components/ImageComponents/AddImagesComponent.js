import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ItemServices from "../services/ItemServices";
import { useEffect, useState } from "react";
import ImageUploadComponent from "./ImageUploadComponent";
import ImageCardComponent from "./ImageCardComponent";


function AddImagesComponent() {


  const { id } = useParams();
  const [uploadProgress, setUploadProgress] = useState("getUpLoad");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [imgErrorMessage, setImgErrorMessage] = useState("");
  const [imagesForItem, setImagesForItem] = useState([]);





  const getItemImages = async () => {
    if (id) {
      await ItemServices.getAllItemImages(id).then((res) => {
        console.log(res.data);
        setImagesForItem(res.data);
      }
      )

    }
  };

  useEffect(() => {
    getItemImages();
  }, [uploadProgress]);





  const content = () => {

    switch (uploadProgress) {
      case "getUpLoad":
        return <ImageUploadComponent onImageChange={onImageChange} testProps={"TESTING"} />;
      case "upLoading":
        return <div>Uploading....</div>;
      case "uploaded":

        return <ImageUploadComponent onImageChange={onImageChange} testProps={"TESTING"} />;



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




  return (

    <div>
      PICTURES {id}

      {content()}


      <Container >

        <Row className="d-flex justify-content-center  border mt-2">
          {
            imagesForItem.map((item) => {

              let path = `../doc-uploads/${item.itemId}/${item.name}`;

              return (
                <ImageCardComponent path={path} imageData={JSON.stringify(item)} />
              )

            })

          }
        </Row>
      </Container>

    </div>


  )




}


export default AddImagesComponent;