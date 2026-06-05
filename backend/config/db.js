const mysql = require("mysql2");

require("dotenv").config();



// Create MySQL Connection

const db = mysql.createConnection({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,
    waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

});



// Connect Database

db.connect((err) => {

  if (err) {

    console.log(
      "Database Connection Failed:",
      err
    );

  } else {

    console.log(
      "MySQL Database Connected"
    );
    
    connection.release();

  }

});




module.exports = db;