const express = require("express");

const router = express.Router();




// Import Controllers

const {

  registerUser,

  loginUser

} = require("../controllers/authController");




// ==============================
// AUTH ROUTES
// ==============================




// Register User

router.post(

  "/register",

  registerUser

);




// Login User

router.post(

  "/login",

  loginUser

);




// EXPORT

module.exports = router;