const db = require("../config/db");




// ==============================
// REGISTER FOR EVENT
// ==============================

const registerEvent = (

  user_id,
  event_id,

  callback

) => {

  const query =
    `
    INSERT INTO registrations
    (user_id, event_id)
    VALUES (?, ?)
    `;





  db.query(

    query,

    [
      user_id,
      event_id
    ],

    callback

  );

};




// ==============================
// CHECK EXISTING REGISTRATION
// ==============================

const checkRegistration = (

  user_id,
  event_id,

  callback

) => {

  const query =
    `
    SELECT *
    FROM registrations
    WHERE user_id = ?
    AND event_id = ?
    `;





  db.query(

    query,

    [
      user_id,
      event_id
    ],

    callback

  );

};




// ==============================
// GET STUDENT REGISTERED EVENTS
// ==============================

const getMyEvents = (

  user_id,

  callback

) => {

  const query =
    `
    SELECT

      events.id,
      events.title,
      events.description,
      events.date,
      events.venue,
      events.category,
      events.image

    FROM registrations

    INNER JOIN events

    ON registrations.event_id = events.id

    WHERE registrations.user_id = ?
    `;





  db.query(
    query,
    [user_id],

    callback

  );

};




// ==============================
// DELETE REGISTERED EVENT
// ==============================

const removeRegistration = (

  user_id,
  event_id,

  callback

) => {

  const query =
    `
    DELETE FROM registrations

    WHERE user_id = ?
    AND event_id = ?
    `;





  db.query(

    query,

    [
      user_id,
      event_id
    ],

    callback

  );

};




// ==============================
// GET TOTAL REGISTRATIONS
// ==============================

const getTotalRegistrations = (

  callback

) => {

  const query =
    `
    SELECT COUNT(*) AS total
    FROM registrations
    `;





  db.query(
    query,

    callback

  );

};




// ==============================
// GET EVENT REGISTRATIONS COUNT
// ==============================

const getEventRegistrationCount = (

  event_id,

  callback

) => {

  const query =
    `
    SELECT COUNT(*) AS total

    FROM registrations

    WHERE event_id = ?
    `;





  db.query(
    query,
    [event_id],

    callback

  );

};




// EXPORTS

module.exports = {

  registerEvent,

  checkRegistration,

  getMyEvents,

  removeRegistration,

  getTotalRegistrations,

  getEventRegistrationCount

};