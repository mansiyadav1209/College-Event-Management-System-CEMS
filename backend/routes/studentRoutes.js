const express = require("express");

const router = express.Router();




// Import Controllers

const {

  getStudentProfile,

  updateStudentProfile,

  getMyEvents,

  removeMyEvent,

  getDashboardStats

} = require("../controllers/studentController");




// Import Middleware

const authMiddleware =
  require("../middleware/authMiddleware");




// ==============================
// STUDENT ROUTES
// ==============================




// GET STUDENT PROFILE

router.get(

  "/profile/:id",

  authMiddleware,

  getStudentProfile

);




// UPDATE PROFILE

router.put(

  "/profile/:id",

  authMiddleware,

  updateStudentProfile

);




// GET REGISTERED EVENTS

router.get(

  "/myevents/:id",

  authMiddleware,

  getMyEvents

);




// REMOVE REGISTERED EVENT

router.delete(

  "/myevents/remove",

  authMiddleware,

  removeMyEvent

);




// STUDENT DASHBOARD STATS

router.get(

  "/dashboard/:id",

  authMiddleware,

  getDashboardStats

);




// EXPORT

module.exports = router;