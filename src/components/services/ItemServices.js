import axios from 'axios';
import AuthServices from './AuthServices';

const ITEM_BASE_API_URL = "http://localhost:8080/api/items";
const DROP_DOWN_SELECTIONS_URL = "/drop-down-selections"
const SALES_STATUS_SELECT_URL = ITEM_BASE_API_URL + `${DROP_DOWN_SELECTIONS_URL}/100`;
const CONDITION_SELECT_URL = ITEM_BASE_API_URL + `${DROP_DOWN_SELECTIONS_URL}/200`;
const CATEGORY_SELECT_URL = ITEM_BASE_API_URL + `${DROP_DOWN_SELECTIONS_URL}/300`;
const CATEGORY_ADD_URL = ITEM_BASE_API_URL + `${DROP_DOWN_SELECTIONS_URL}/addNewCategory`;
const DROPDOWN_DELETE_URL = ITEM_BASE_API_URL + `${DROP_DOWN_SELECTIONS_URL}/deleteSelection`;
const IMAGE_ADMIN = ITEM_BASE_API_URL + "/image-admin";
const AllITEMCATEGORIES = `${ITEM_BASE_API_URL}/getAllCategories`;



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

  getAllSelections() {
    let auth_header = AuthServices.getAuthHeaders();
    return axios.get(ITEM_BASE_API_URL+DROP_DOWN_SELECTIONS_URL,auth_header);
  }

  getAllConditionSelections() {
    let auth_header = AuthServices.getAuthHeaders();
    if(auth_header!=null){
      return axios.get(CONDITION_SELECT_URL,auth_header);
    }
    else{
      console.log("Whats going on")
      return axios.get(ITEM_BASE_API_URL);
    }
    
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
    //let auth_header = AuthServices.getAuthHeaders();
    return axios.get(`${IMAGE_ADMIN}/getByItemId/${itemId}`);
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
  addNewCategory(dropDownSelection){
    let auth_header = AuthServices.getAuthHeaders();
    //console.log(JSON.parse(dropDownSelection) + " Trying to add");
    return axios.post(CATEGORY_ADD_URL,dropDownSelection,auth_header);

  }

  deleteDropDownSelection(id){
    let auth_header = AuthServices.getAuthHeaders();
    return axios.delete(`${DROPDOWN_DELETE_URL}/${id}`,auth_header);
  }

  getAllCategories(){
    return axios.get(AllITEMCATEGORIES);
  }

}

export default new ItemService;