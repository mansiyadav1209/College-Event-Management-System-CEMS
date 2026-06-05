const express = require("express");

const cors = require("cors");

require("dotenv").config();




// Import DB Connection

require("./config/db");




// Import Routes

const authRoutes =
  require("./routes/authRoutes");

const eventRoutes =
  require("./routes/eventRoutes");

const studentRoutes =
  require("./routes/studentRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

const notificationRoutes =
  require("./routes/notificationRoutes");

const facultyRoutes = 
  require("./routes/facultyRoutes");





// Import Error Middleware

const errorMiddleware =
  require("./middleware/errorMiddleware");




// ==============================
// INITIALIZE APP
// ==============================

const app = express();




// ==============================
// MIDDLEWARE
// ==============================

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend-domain.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({

  extended: true

}));




// ==============================
// API ROUTES
// ==============================

app.use(

  "/api/auth",

  authRoutes

);




app.use(

  "/api/events",

  eventRoutes

);




app.use(

  "/api/students",

  studentRoutes

);



app.use(
  
  "/api/faculties",

   facultyRoutes
);



app.use(

  "/api/admin",

  adminRoutes

);




app.use(

  "/api/notifications",

  notificationRoutes

);




// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {

  res.send(

    "College Event Management API Running"

  );

});




// ==============================
// ERROR MIDDLEWARE
// ==============================

app.use(errorMiddleware);




// ==============================
// START SERVER
// ==============================

const PORT =
  process.env.PORT || 5000;





app.listen(PORT, () => {

  console.log(

    `Server running on port ${PORT}`

  );

});
