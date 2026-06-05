const express = require("express");

const router = express.Router();




// Import Controllers

const {

  getAllStudents,

  deleteStudent,

  getAdminDashboard,

  getAnalytics,

  getAdminEvents,

  sendAdminNotification

} = require("../controllers/adminController");




// Import Middleware

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");




// ==============================
// ADMIN ROUTES
// ==============================




// GET ADMIN DASHBOARD

router.get(

  "/dashboard",

  authMiddleware,

  adminMiddleware,

  getAdminDashboard

);




// GET ANALYTICS

router.get(

  "/analytics",

  authMiddleware,

  adminMiddleware,

  getAnalytics

);




// GET ALL STUDENTS

router.get(

  "/students",

  authMiddleware,

  adminMiddleware,

  getAllStudents

);




// DELETE STUDENT

router.delete(

  "/students/:id",

  authMiddleware,

  adminMiddleware,

  deleteStudent

);




// GET ALL EVENTS

router.get(

  "/events",

  authMiddleware,

  adminMiddleware,

  getAdminEvents

);


router.post(
  "/notifications",
  authMiddleware,
  adminMiddleware,
  sendAdminNotification
);

// EXPORT

module.exports = router;