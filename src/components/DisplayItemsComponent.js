import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import ItemServices from "./services/ItemServices";
import ItemCardComponent from "./ItemCardComponent";
import yardSplash from "../assets/images/yardSplash.png"
import Dropdown from "./services/Dropdown";

function DisplayItemsComponent() {
  const [items, setItems] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    // ItemServices.getAllItems().then((response) => {
    //  setItems(response.data);

    getAllItems();
    getAllCategories();
    // console.log(response.data);
    // }).catch(error => { console.log(error) })
  }, [])



  async function getAllItems() {

    await ItemServices.getAllItems().then((response) => {

      setItems(response.data)
      console.log(response.data);
    }).catch(error => { console.log(error) })
  }

  async function getAllCategories() {
    await ItemServices.getAllCategorySelections()
      .then((response) => {
        response.data.push({ "id": -1, "selectionValue": "All", "selectionType": 300 })
        setAllCategories(response.data);
        console.log(JSON.stringify(response.data[0]) + " IS RESPONSE");
      })

  }

  const setField = (field, value) => {
    console.log(value + " IS THE VALUE PASSED");
    if (value === "All") {
      getAllItems()
      console.log("GOT ALL ITEMS")
    } else {
      ItemServices.getAllItemsByCategory(value).
        then(response => {
          console.log("Got all by " + value)
          setItems(response.data);


        })

    }


    console.log(field + " IS THE FIELD");
    console.log(value + " IS THE VALUE");
    console.log(form + " IS FORM");



    // setForm({
    //   ...form,
    //   [field]: value,
    // });
    // if (!!errors[field]) {
    //   setErrors({
    //     ...errors,
    //     [field]: null,
    //   });
    // }
  };






  return (
    <Container style={{ backgroundColor: '#F4DFB6' }} >
      <Row className="m-2">
        <Col>
          <Dropdown
            options={allCategories}
            defaultval={"All"}
            setFieldStateValue={setField}
            form={form}

            field={"category"}
          />
        </Col>
      </Row>

      <Row>
        {
          items.map((item) => {

            if (item.saleStatus === "For Sale")
              return (
                <ItemCardComponent item={item} />
              )

          })
        }

      </Row>

    </Container>

  )



}
export default DisplayItemsComponent;