const db = require("../config/db");




// ==============================
// GET ALL EVENTS
// ==============================

exports.getAllEvents = (req, res) => {

  // const query =
  //   "SELECT * FROM events";
  const query = `
      SELECT
      e.*,
      u.name AS faculty_name,
      u.email AS faculty_email
      FROM events e
      LEFT JOIN users u
      ON e.faculty_id = u.id
      `;





  db.query(

    query,

    (err, result) => {

      if (err) {
      
        console.log(err);





        return res.status(500).json({

          message: "Failed to Fetch Events"

        });

      }





      res.status(200).json(result);

    }

  );

};




// ==============================
// GET SINGLE EVENT
// ==============================

exports.getSingleEvent = (req, res) => {

  const { id } = req.params;





  // const query =
  //   "SELECT * FROM events WHERE id = ?";
  const query = `
      SELECT
      e.*,
      u.name AS faculty_name,
      u.email AS faculty_email,
      u.phone AS faculty_phone,
      u.department AS faculty_department
      FROM events e
      LEFT JOIN users u
      ON e.faculty_id = u.id
      WHERE e.id = ?
      `;





  db.query(

    query,
    [id],

    (err, result) => {

      if (err) {

        console.log(err);





        return res.status(500).json({

          message: "Database Error"

        });

      }





      if (result.length === 0) {

        return res.status(404).json({

          message: "Event Not Found"

        });

      }





      res.status(200).json(result[0]);

    }

  );

};




// ==============================
// ADD EVENT
// ==============================

exports.addEvent = (req, res) => {

  const {

    title,
    description,
    date,
    venue,
    category,
    image,
    faculty_id

  } = req.body;





  if (

    !title ||
    !description ||
    !date ||
    !venue ||
    !category ||
    !faculty_id 

  ) {

    return res.status(400).json({

      message: "All fields are required"

    });

  }





  const query = `

    INSERT INTO events

    (

      title,
      description,
      date,
      venue,
      category,
      image,
      faculty_id

    )

    VALUES (?,?, ?, ?, ?, ?, ?)

  `;





  db.query(

    query,

    [

      title,
      description,
      date,
      venue,
      category,
      image || null,
      faculty_id || null

    ],

    (err, result) => {

      if (err) {

        console.log(err);





        return res.status(500).json({

          message: "Failed to Add Event"

        });

      }





      res.status(201).json({

        message: "Event Added Successfully"

      });

    }

  );

};




// ==============================
// UPDATE EVENT
// ==============================

exports.updateEvent = (req, res) => {

  const { id } = req.params;





  const {

    title,
    description,
    date,
    venue,
    category,
    image,
    faculty_id

  } = req.body;





  const query = `

    UPDATE events

    SET

      title = ?,
      description = ?,
      date = ?,
      venue = ?,
      category = ?,
      image = ?,
      faculty_id=?

    WHERE id = ?

  `;





  db.query(

    query,

    [

      title,
      description,
      date.split("T")[0],
      venue,
      category,
      image || null,
      faculty_id || null,
      id

    ],

    (err, result) => {

      if (err) {

        console.log("UPDATE ERROR:", err);





        return res.status(500).json({

          message: "Failed to Update Event"

        });

      }





      res.status(200).json({

        message:
          "Event Updated Successfully"

      });

    }

  );

};




// ==============================
// DELETE EVENT
// ==============================

exports.deleteEvent = (req, res) => {

  const { id } = req.params;





  const query =
    "DELETE FROM events WHERE id = ?";





  db.query(

    query,
    [id],

    (err, result) => {

      if (err) {

        console.log(err);





        return res.status(500).json({

          message: "Failed to Delete Event"

        });

      }





      res.status(200).json({

        message:
          "Event Deleted Successfully"

      });

    }

  );

};




// ==============================
// REGISTER EVENT
// ==============================

exports.registerEvent = (req, res) => {

  const {

    user_id,
    event_id

  } = req.body;





  if (

    !user_id ||
    !event_id

  ) {

    return res.status(400).json({

      message: "Missing Data"

    });

  }





  const checkQuery = `

    SELECT * FROM registrations

    WHERE user_id = ?
    AND event_id = ?

  `;





  db.query(

    checkQuery,

    [

      user_id,
      event_id

    ],

    (err, result) => {

      if (err) {

        console.log(err);





        return res.status(500).json({

          message: "Database Error"

        });

      }





      // Already Registered

      if (result.length > 0) {

        return res.status(400).json({

          message:
            "Already Registered for this Event"

        });

      }





      const insertQuery = `

        INSERT INTO registrations

        (

          user_id,
          event_id

        )

        VALUES (?, ?)

      `;





      db.query(

        insertQuery,

        [

          user_id,
          event_id

        ],

        (err, result) => {

          if (err) {

            console.log(err);





            return res.status(500).json({

              message:
                "Registration Failed"

            });

          }





          res.status(201).json({

            message:
              "Event Registration Successful"

          });

        }

      );

    }

  );

};


exports.getMyRegisteredEvents = (req, res) => {

  const userId = req.params.userId;





  const query = `

    SELECT

      events.*

    FROM registrations

    JOIN events

    ON registrations.event_id = events.id

    WHERE registrations.user_id = ?

  `;





  db.query(

    query,

    [userId],

    (err, result) => {

      if (err) {

        console.log(err);





        return res.status(500).json({

          message:
            "Failed to Fetch Registered Events"

        });

      }





      res.status(200).json(result);

    }

  );

};



exports.getRegisteredStudents =
(req,res)=>{

 const eventId = req.params.eventId;

 const query = `
 SELECT
 u.id,
 u.name,
 u.email,
 u.phone,
u.course
 FROM registrations r
 JOIN users u
 ON r.user_id = u.id
 WHERE r.event_id = ?
 AND u.role = 'student'
 `;

 db.query(
  query,
  [eventId],
  (err,result)=>{

    if(err)
      return res.status(500).json(err);

    res.json(result);
  }
 );
};

exports.cancelRegistration =
  (req, res) => {

  const {

    user_id,
    event_id

  } = req.body;





  const query = `

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

    (err, result) => {

      if (err) {

        console.log(err);





        return res.status(500).json({

          message:
            "Failed to Cancel Registration"

        });

      }





      res.status(200).json({

        message:
          "Registration Cancelled Successfully"

      });

    }

  );

};

exports.getFacultyEvents = (req,res)=>{

 const facultyId = req.params.id;

 db.query(
   "SELECT * FROM events WHERE faculty_id=?",
   [facultyId],
   (err,result)=>{

      if(err)
         return res.status(500).json(err);

      res.json(result);
   }
 );

};

exports.getFaculties = (req, res) => {

  const query = `
    SELECT id,name,email
    FROM users
    WHERE role='faculty'
  `;

  db.query(query, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Database Error"
      });
    }

    res.json(result);

  });

};