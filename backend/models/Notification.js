const db = require("../config/db");




// ==============================
// GET ALL NOTIFICATIONS
// ==============================

const getAllNotifications = (

  callback

) => {

  const query =
    `
    SELECT *
    FROM notifications
    ORDER BY created_at DESC
    `;





  db.query(
    query,

    callback

  );

};




// ==============================
// GET SINGLE NOTIFICATION
// ==============================

const getNotificationById = (

  id,

  callback

) => {

  const query =
    `
    SELECT *
    FROM notifications
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    callback

  );

};




// ==============================
// ADD NOTIFICATION
// ==============================

const addNotification = (

  title,
  message,

  callback

) => {

  const query =
    `
    INSERT INTO notifications
    (title, message)

    VALUES (?, ?)
    `;





  db.query(

    query,

    [
      title,
      message
    ],

    callback

  );

};




// ==============================
// UPDATE NOTIFICATION
// ==============================

const updateNotification = (

  id,
  title,
  message,

  callback

) => {

  const query =
    `
    UPDATE notifications

    SET
      title = ?,
      message = ?

    WHERE id = ?
    `;





  db.query(

    query,

    [
      title,
      message,
      id
    ],

    callback

  );

};




// ==============================
// DELETE NOTIFICATION
// ==============================

const deleteNotification = (

  id,

  callback

) => {

  const query =
    `
    DELETE FROM notifications
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    callback

  );

};




// EXPORTS

module.exports = {

  getAllNotifications,

  getNotificationById,

  addNotification,

  updateNotification,

  deleteNotification

};