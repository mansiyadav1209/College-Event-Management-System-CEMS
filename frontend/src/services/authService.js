import API from "./api";




// Register User

export const registerUser = async (userData) => {

  try {

    const res = await API.post(
      "/auth/register",
      userData
    );

    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Login User

export const loginUser = async (userData) => {

  try {

    const res = await API.post(
      "/auth/login",
      userData
    );



    // Save Token

    localStorage.setItem(
      "token",
      res.data.token
    );



    return res.data;

  } catch (err) {

    throw err.response?.data || err;

  }

};




// Logout User

export const logoutUser = () => {

  localStorage.removeItem("token");

};




// Get Token

export const getToken = () => {

  return localStorage.getItem("token");

};




// Check Authentication

export const isAuthenticated = () => {

  return !!localStorage.getItem("token");

};