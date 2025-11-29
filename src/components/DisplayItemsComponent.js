import { Container, Row, Col, CardGroup } from "react-bootstrap";
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
    // getAllCategories();
    //getAllCategories2();
    // console.log(response.data);
    // }).catch(error => { console.log(error) })
  }, [])



  async function getAllItems() {
    await ItemServices.getAllItems().then((response) => {
      setItems(response.data);
      setCats(response.data);
      console.log(response.data);
    }).catch(error => { console.log(error) })
  }

  function setCats(allitems) {
    const cats = [{ "id": -1, "selectionValue": "All", "selectionType": 100 }];
    for (const i of allitems) {
      if (i.saleStatus === "For Sale") {
        console.log(JSON.stringify(cats) + " cats")
        const containsValue = cats.some(item => item.selectionValue === i.category);
        if (!containsValue) {
          cats.push({ id: i.id, selectionValue: i.category, selectionType: 300 })
        }
      }
    }
    setAllCategories(cats);
    console.log(JSON.stringify(cats) + " CATS");
  }

  async function getAllCategories() {
    await ItemServices.getAllCategorySelections()
      .then((response) => {
        response.data.push({ "id": -1, "selectionValue": "All", "selectionType": 100 })
        setAllCategories(response.data);
        // console.log(JSON.stringify(response.data) + " IS REPONSEs");
      }).catch(error => { console.log(error) })

  }

  async function getAllCategories1() {
    await ItemServices.getAllCategories()
      .then((response) => {
        // response.data.push({ "id": -1, "selectionValue": "All", "selectionType": 100 })
        // setAllCategories(JSON.stringify(response.data[0]));
        setAllCategories(response.data);
      }).catch(error => { console.log(error) })

  }

  async function getAllCategories2() {
    const names = [];
    console.log(JSON.stringify(items) + "xxx");
    for (const i of items) {
      names.push(i.category);
    }

    console.log(JSON.stringify(names) + "CATS????");


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


        }).catch(error => { console.log(error) })

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
    <Container style={{ backgroundColor: '#F4DFB6' }} className="defaultfontColor">
      <Row className="m-2 ">
        <Col>
          <Dropdown
            options={allCategories}
            defaultval={"All"}
            setFieldStateValue={setField}
            form={form}
            className="defaultfontColor"
            field={"category"}
          />



        </Col>
      </Row>

      <Row className="m-2">
        <CardGroup>
          {
            items.map((item) => {

              if (item.saleStatus === "For Sale")
                return (
                  <ItemCardComponent item={item} />
                )
            })
          }
        </CardGroup>
      </Row>


    </Container>

  )

}
export default DisplayItemsComponent;