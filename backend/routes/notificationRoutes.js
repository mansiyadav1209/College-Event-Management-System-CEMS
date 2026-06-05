const express = require("express");

const router = express.Router();




// Import Controller

const {

  getNotifications,

  getSingleNotification,

  addNotification,

  updateNotification,

  deleteNotification,

  sendNotification,
  getStudentNotifications,
  sendAdminNotification,
  getFacultyNotifications

} = require("../controllers/notificationController");




// Import Middleware

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");




// ==============================
// NOTIFICATION ROUTES
// ==============================




// GET ALL NOTIFICATIONS

router.get(

  "/",

  authMiddleware,

  getNotifications

);

router.get(
  "/student/:userId",
  getStudentNotifications
);

router.get(
  "/faculty",
  authMiddleware,
  getFacultyNotifications
);

// GET SINGLE NOTIFICATION

router.get(

  "/:id",

  authMiddleware,

  getSingleNotification

);




// ADD NOTIFICATION (ADMIN ONLY)

router.post(

  "/",

  authMiddleware,

  adminMiddleware,

  addNotification

);




// UPDATE NOTIFICATION (ADMIN ONLY)

router.put(

  "/:id",

  authMiddleware,

  adminMiddleware,

  updateNotification

);




// DELETE NOTIFICATION (ADMIN ONLY)

router.delete(

  "/:id",

  authMiddleware,

  adminMiddleware,

  deleteNotification

);


router.post(
  "/send",
  authMiddleware,
  sendNotification
);

router.post(
  "/admin/send",
  authMiddleware,
  adminMiddleware,
  sendAdminNotification
);



// EXPORT

module.exports = router;