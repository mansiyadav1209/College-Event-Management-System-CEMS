// const mysql = require("mysql2");

// require("dotenv").config();



// // Create MySQL Connection

// const db = mysql.createConnection({

//   host: process.env.DB_HOST,

//   user: process.env.DB_USER,

//   password: process.env.DB_PASSWORD,

// });



// // Connect Database

// db.connect((err) => {

//   if (err) {

//     console.log(
//       "Database Connection Failed:",
//       err
//     );

//   } else {

//     console.log(
//       "MySQL Database Connected"
//     );
    

//   }

// });




// module.exports = db;


const mysql = require("mysql2");
require("dotenv").config();

// Create MySQL Pool (BEST for Vercel / serverless)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ Database Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Database Connected");
    connection.release();
  }
});

module.exports = db;