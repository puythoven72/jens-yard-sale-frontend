import axios from 'axios';


const ITEM_BASE_API_URL = "http://localhost:8080/api/items";
const SALES_STATUS_SELECT_URL = ITEM_BASE_API_URL + "/drop-down-selections/100";
const CONDITION_SELECT_URL = ITEM_BASE_API_URL + "/drop-down-selections/200";
const CATEGORY_SELECT_URL = ITEM_BASE_API_URL + "/drop-down-selections/300";

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

}

export default new ItemService;