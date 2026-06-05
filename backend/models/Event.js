const db = require("../config/db");




// ==============================
// GET ALL EVENTS
// ==============================

const getAllEvents = (

  callback

) => {

  const query =
    `
    SELECT *
    FROM events
    ORDER BY id DESC
    `;





  db.query(
    query,

    callback

  );

};




// ==============================
// GET SINGLE EVENT
// ==============================

const getEventById = (

  id,

  callback

) => {

  const query =
    `
    SELECT *
    FROM events
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    callback

  );

};




// ==============================
// ADD EVENT
// ==============================

const addEvent = (

  title,
  description,
  date,
  venue,
  category,
  image,

  callback

) => {

  const query =
    `
    INSERT INTO events
    (
      title,
      description,
      date,
      venue,
      category,
      image
    )

    VALUES (?, ?, ?, ?, ?, ?)
    `;





  db.query(

    query,

    [
      title,
      description,
      date,
      venue,
      category,
      image
    ],

    callback

  );

};




// ==============================
// UPDATE EVENT
// ==============================

const updateEvent = (

  id,
  title,
  description,
  date,
  venue,
  category,
  image,

  callback

) => {

  const query =
    `
    UPDATE events

    SET
      title = ?,
      description = ?,
      date = ?,
      venue = ?,
      category = ?,
      image = ?

    WHERE id = ?
    `;





  db.query(

    query,

    [
      title,
      description,
      date,
      venue,
      category,
      image,
      id
    ],

    callback

  );

};




// ==============================
// DELETE EVENT
// ==============================

const deleteEvent = (

  id,

  callback

) => {

  const query =
    `
    DELETE FROM events
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    callback

  );

};




// ==============================
// GET EVENT ANALYTICS
// ==============================

const getEventAnalytics = (

  callback

) => {

  const query =
    `
    SELECT

      events.id,
      events.title,

      COUNT(registrations.id)
      AS registrations

    FROM events

    LEFT JOIN registrations

    ON events.id = registrations.event_id

    GROUP BY events.id
    `;





  db.query(
    query,

    callback

  );

};




// EXPORTS

module.exports = {

  getAllEvents,

  getEventById,

  addEvent,

  updateEvent,

  deleteEvent,

  getEventAnalytics

};