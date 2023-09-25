import axios from 'axios';


const ITEM_BASE_API_URL = "http://localhost:8080/api/items";
const SALES_STATUS_SELECT_URL = ITEM_BASE_API_URL + "/drop-down-selections/100";
const CONDITION_SELECT_URL = ITEM_BASE_API_URL + "/drop-down-selections/200";
const CATEGORY_SELECT_URL = ITEM_BASE_API_URL + "/drop-down-selections/300";
const IMAGE_ADMIN = ITEM_BASE_API_URL + "/image-admin";

class ItemService {

  getAllItems() {
    return axios.get(ITEM_BASE_API_URL);
  }

  createItem(item) {

    return axios.post(ITEM_BASE_API_URL, item);
  }

  getItemById(id) {
    console.log(id + " is id ");
    return axios.get(ITEM_BASE_API_URL + "/" + id);
  }

  updateItem(id, item) {
    return axios.put(ITEM_BASE_API_URL + "/" + id, item);
  }

  deleteItemById(id) {
    return axios.delete(ITEM_BASE_API_URL + "/" + id);
  }
  markItemAsSoldById(id) {

    return axios.patch(ITEM_BASE_API_URL + "/" + id);
  }

  getAllSalesStatusSelections() {

    return axios.get(SALES_STATUS_SELECT_URL);
  }

  getAllConditionSelections() {

    return axios.get(CONDITION_SELECT_URL);
  }

  getAllCategorySelections() {

    return axios.get(CATEGORY_SELECT_URL);
  }


  createItemImage(file) {
    return axios.post(IMAGE_ADMIN, file);
  }


  getAllItemImages(itemId) {
    console.log(itemId + " is the ID");
    return axios.get(`${IMAGE_ADMIN}/getByItemId/${itemId}`);
  }

  markImageAsPrimary(id) {
    console.log(typeof Number(id) + " " + id);
    return axios.patch(`${IMAGE_ADMIN}/markAsPrimary/${id}`);
  }

  deleteImageById(id) {
    return axios.delete(`${IMAGE_ADMIN}/deleteImage/${id}`);
  }

}

export default new ItemService;