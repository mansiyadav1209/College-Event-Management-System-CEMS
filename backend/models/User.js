const db = require("../config/db");




// ==============================
// CREATE USER
// ==============================

const createUser = (

  name,
  email,
  password,
  role = "student",

  callback

) => {

  const query =
    `
    INSERT INTO users
    (name, email, password, role)
    VALUES (?, ?, ?, ?)
    `;





  db.query(

    query,

    [
      name,
      email,
      password,
      role
    ],

    callback

  );

};




// ==============================
// FIND USER BY EMAIL
// ==============================

const findUserByEmail = (

  email,

  callback

) => {

  const query =
    `
    SELECT *
    FROM users
    WHERE email = ?
    `;





  db.query(
    query,
    [email],

    callback

  );

};




// ==============================
// FIND USER BY ID
// ==============================

const findUserById = (

  id,

  callback

) => {

  const query =
    `
    SELECT
      id,
      name,
      email,
      role
    FROM users
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    callback

  );

};




// ==============================
// GET ALL STUDENTS
// ==============================

const getAllStudents = (

  callback

) => {

  const query =
    `
    SELECT
      id,
      name,
      email,
      role
    FROM users
    WHERE role = 'student'
    `;





  db.query(
    query,

    callback

  );

};




// ==============================
// UPDATE USER
// ==============================

const updateUser = (

  id,
  name,
  email,

  callback

) => {

  const query =
    `
    UPDATE users
    SET
      name = ?,
      email = ?
    WHERE id = ?
    `;





  db.query(

    query,

    [
      name,
      email,
      id
    ],

    callback

  );

};




// ==============================
// DELETE USER
// ==============================

const deleteUser = (

  id,

  callback

) => {

  const query =
    `
    DELETE FROM users
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

  createUser,

  findUserByEmail,

  findUserById,

  getAllStudents,

  updateUser,

  deleteUser

};