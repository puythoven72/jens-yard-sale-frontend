import axios from 'axios';
import AuthServices from './AuthServices';

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
    let auth_header = AuthServices.getAuthHeaders();
    return axios.post(ITEM_BASE_API_URL, item,auth_header);
  }

  getItemById(id) {   
    let auth_header = AuthServices.getAuthHeaders();
    console.log(auth_header);

    return axios.get(ITEM_BASE_API_URL + "/" + id,auth_header

    );
  }

  updateItem(id, item) {
    let auth_header = AuthServices.getAuthHeaders();
    console.log(auth_header);

    return axios.put(ITEM_BASE_API_URL + "/" + id,item,auth_header);
  }

  deleteItemById(id) {
    let auth_header = AuthServices.getAuthHeaders();
    console.log(auth_header);
    return axios.delete(ITEM_BASE_API_URL + "/" + id,auth_header);
  }
  markItemAsSoldById(id) {
    let auth_header = AuthServices.getAuthHeaders();
    return axios.patch(ITEM_BASE_API_URL + "/" + id,"",auth_header);
  }

  getAllSalesStatusSelections() {
    let auth_header = AuthServices.getAuthHeaders();

    return axios.get(SALES_STATUS_SELECT_URL,auth_header);
  }

  getAllConditionSelections() {
    let auth_header = AuthServices.getAuthHeaders();
    return axios.get(CONDITION_SELECT_URL,auth_header);
  }

  getAllCategorySelections() {
    //let auth_header = AuthServices.getAuthHeaders();
    return axios.get(CATEGORY_SELECT_URL);
  }


  createItemImage(file) {
    let auth_header = AuthServices.getAuthHeaders();
    return axios.post(IMAGE_ADMIN, file,auth_header);
  }


  getAllItemImages(itemId) {
    console.log(itemId + " is the ID");
    let auth_header = AuthServices.getAuthHeaders();
    return axios.get(`${IMAGE_ADMIN}/getByItemId/${itemId}`,auth_header);
  }



  getPrimaryItemImage(itemId) {
    console.log(itemId + " is the ID");
    //let auth_header = AuthServices.getAuthHeaders();
    return axios.get(`${IMAGE_ADMIN}/primaryImage/${itemId}`);
  }

  markImageAsPrimary(id) {
    
    let auth_header = AuthServices.getAuthHeaders();
    console.log(auth_header);
    return axios.patch(`${IMAGE_ADMIN}/markAsPrimary/${id}`,"",auth_header);
  }

  deleteImageById(id) {
    let auth_header = AuthServices.getAuthHeaders();
    return axios.delete(`${IMAGE_ADMIN}/deleteImage/${id}`,auth_header);
  }

  getAllItemsByCategory(category) {
    return axios.get(`${ITEM_BASE_API_URL}/itemsByCategory/${category}`);
  }

}

export default new ItemService;