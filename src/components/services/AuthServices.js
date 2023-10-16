//import axios,AxiosRequestConfig from 'axios';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const USER_BASE_API_URL = "http://localhost:8080/api/user";

class AuthServices {


  registerUser(user) {
    //  console.log(user);
    return axios.post(`${USER_BASE_API_URL}/registerSave`, user);
  }

  logInUser(user) {
    //  console.log(user);

    // let userData = axios.post(`${USER_BASE_API_URL}/login`, user);
    // console.log((userData));
    return axios.post(`${USER_BASE_API_URL}/login`, user);
  }

  getAuthToken() {
    

    let auth_token = window.localStorage.getItem("auth_token");


    if (auth_token) {
      let currentDateTime = new Date();
      console.log("GETTING AUTH TOKEN before check " + currentDateTime + " " + new Date(JSON.parse(auth_token).expdte));
      if (currentDateTime > new Date(JSON.parse(auth_token).expdte)) {
        console.log("removing token");
        localStorage.removeItem("auth_token");
      }else{
        console.log("TOKEN NOT REMOVED");
      }

    }

    return window.localStorage.getItem("auth_token");
  }


  setAuthToken(token) {
    let exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + 40);
    window.localStorage.setItem("auth_token",
      JSON.stringify(
        {
          value: token,
          expdte: exdate

        }
      )
    );

  }



  getAuthHeaders() {

    let headers = {};
    if (JSON.parse(this.getAuthToken()).value !== null || JSON.parse(this.getAuthToken()).value !== 'null' || JSON.parse(this.getAuthToken()).value !== "") {
      headers =
      {
        headers:
        {
          Authorization: `Bearer ${JSON.parse(this.getAuthToken()).value}`
        }
      };

    }
    return headers;
  }




}

export default new AuthServices;