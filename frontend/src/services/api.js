import axios from "axios";

const API = axios.create({

  baseURL: "https://college-event-management-system-cem.vercel.app/api"

});




// Add Token Automatically

API.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization = token;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);




export default API;