import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ItemServices from "../services/ItemServices";
import { useEffect, useState } from "react";
import ImageUploadComponent from "./ImageUploadComponent";
import ImageCardComponent from "./ImageCardComponent";


import { useLocation } from 'react-router-dom';



function AddImagesComponent(props) {


  const { id } = useParams();
  const [uploadProgress, setUploadProgress] = useState("getUpLoad");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [imgErrorMessage, setImgErrorMessage] = useState("");
  const [imagesForItem, setImagesForItem] = useState([]);
  const [primaryImageForItem, setPrimaryImageForItem] = useState([]);
  const [itemImageUpdate, setItemImageUpdate] = useState("");
  const [itemData, setItemData] = useState({});
  const [editItemPage, setEditItemPage] = useState("");

  const location = useLocation()


  const getItemImages = async () => {
    if (id) {
      await ItemServices.getAllItemImages(id).then((res) => {
        //console.log(JSON.stringify(res.data) + " PATH");
        //  setImagesForItem(res.data);
        // parsePrimaryImage(JSON.stringify(res.data));
        //  console.log(JSON.stringify(res.data) + " DATA ");
        parsePrimaryImage(res.data);
        //  setUploadProgress("getUpLoad");

      }
      )
    }
  };


  function parsePrimaryImage(data) {
    // let data = JSON.parse(jsonData);
    console.log(JSON.stringify(data) + " IS DATA");
    data.filter((element) => {
      if (element.primary) {
        console.log(JSON.stringify(element) + " E ");
        let index = data.indexOf(element);
        console.log(data.indexOf(element) + " PRIME ");
        // remove the primary from the list
        if (index >= 0) {
          data.splice(index, 1);
        }

        setPrimaryImageForItem([element]);

      }
    })
    setImagesForItem(data);

  }


  useEffect(() => {
    if (location.state) {
      // let _itemData = location.state.body.form ;
      setItemData(location.state.body.form);
      console.log(location.state.from);
      setEditItemPage(location.state.from);


    }

    getItemImages();
  }, [uploadProgress, itemImageUpdate]);





  const content = () => {

    switch (uploadProgress) {
      case "getUpLoad":
        return <ImageUploadComponent onImageChange={onImageChange} itemData={itemData} />;
      case "upLoading":
        return <div>Uploading....</div>;
      case "uploaded":

        return <ImageUploadComponent onImageChange={onImageChange} itemData={itemData} />;



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
      file.append("isMain", false)
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

    <div className="card col-md-6 offset-md-3 offset-md-3">
      ID {id}

      {content()}


      <Container >

        <Row className="justify-content-center">
          {
            primaryImageForItem.map((primaryItem) => {
              let path = `../../doc-uploads/${primaryItem.itemId}/${primaryItem.name}`;
              return (
                <Row className="justify-content-center">

                  <ImageCardComponent path={path} imageData={JSON.stringify(primaryImageForItem[0])} setItemImageUpdate={setItemImageUpdate} />
                </Row>
              )
            })
          }


          {
            imagesForItem.map((item) => {

              let path = `../../doc-uploads/${item.itemId}/${item.name}`;
              return (
                <ImageCardComponent path={path} imageData={JSON.stringify(item)} setItemImageUpdate={setItemImageUpdate} />
              )

            })
          }
        </Row>

        <Row className="mt-2">
          <Col className=" col-12">
            <Row>
              <Link to={`/admin/edit-item/${id}`} className="btn btn-danger">
                Cancel
              </Link>
            </Row>
          </Col>
        </Row>


        <Row className="mt-2">
          <Col className=" col-12">
            <Row>
              <Link to={"/admin"} className="btn btn-success">
                Done
              </Link>
            </Row>
          </Col>
        </Row>

      </Container>

    </div>

  )
}




export default AddImagesComponent;