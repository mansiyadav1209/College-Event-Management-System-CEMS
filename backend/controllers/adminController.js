const db = require("../config/db");




// ==============================
// GET ALL STUDENTS
// ==============================

exports.getAllStudents = (req, res) => {
   console.log("GET ALL STUDENTS CONTROLLER HIT-->for ManageStudent page");
  const query = `
    SELECT
      u.id AS id,
      r.id AS registration_id,
      u.name,
      u.email,
      u.phone,
      u.course,
      u.year,
      e.title AS event_title,
      e.date AS event_date,
      f.name As faculty_name,
       f.name AS faculty_name,
      f.phone AS faculty_phone

    FROM registrations r

    JOIN users u
      ON r.user_id = u.id

    JOIN events e
      ON r.event_id = e.id

     LEFT JOIN users f
     ON e.faculty_id = f.id

    WHERE u.role = 'student'
    ORDER BY e.date DESC
  `;

  db.query(query, (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to Fetch Registrations"
      });
    }

    console.log("RESULT:", result);

    res.status(200).json(result);

  });

};



// ==============================
// DELETE STUDENT
// ==============================

exports.deleteStudent = (req, res) => {

  const { id } = req.params; // registration_id

  db.query(
    "DELETE FROM registrations WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Failed to Remove Registration"
        });
      }

      res.status(200).json({
        message: "Registration Removed Successfully"
      });

    }
  );

};


// ==============================
// GET ADMIN DASHBOARD STATS
// ==============================
exports.getAdminDashboard = (req, res) => {

  const totalEventsQuery =
    "SELECT COUNT(*) AS totalEvents FROM events";

  const registeredStudentsQuery =
    "SELECT COUNT(*) AS registeredStudents FROM users WHERE role='student'";

  const upcomingEventsQuery =
    "SELECT COUNT(*) AS upcomingEvents FROM events WHERE date >= CURDATE()";

  const registrationsQuery =
    "SELECT COUNT(*) AS totalRegistrations FROM registrations";

  db.query(totalEventsQuery, (err, totalEvents) => {

    if (err) return res.status(500).json({ message: "Database Error" });

    db.query(registeredStudentsQuery, (err, students) => {

      if (err) return res.status(500).json({ message: "Database Error" });

      db.query(upcomingEventsQuery, (err, upcoming) => {

        if (err) return res.status(500).json({ message: "Database Error" });

        db.query(registrationsQuery, (err, registrations) => {

          if (err) return res.status(500).json({ message: "Database Error" });

          res.json({
            totalEvents: totalEvents[0].totalEvents,
            registeredStudents: students[0].registeredStudents,
            upcomingEvents: upcoming[0].upcomingEvents,
            totalRegistrations: registrations[0].totalRegistrations
          });

        });

      });

    });

  });

};





// ==============================
// GET EVENT ANALYTICS
// ==============================

exports.getAnalytics = async (req, res) => {
  try {

    const [events] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM events"
    );

    const [students] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM users WHERE role='student'"
    );

    const [faculties] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM users WHERE role='faculty'"
    );

    const [registrations] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM registrations"
    );

    const [upcoming] = await db.promise().query(
      "SELECT COUNT(*) AS total FROM events WHERE date >= CURDATE()"
    );

    const [registrationData] = await db.promise().query(`
      SELECT
      e.title AS name,
      COUNT(r.id) AS registrations
      FROM events e
      LEFT JOIN registrations r
      ON e.id = r.event_id
      GROUP BY e.id
    `);

    const [categoryData] = await db.promise().query(`
      SELECT
      category AS name,
      COUNT(*) AS value
      FROM events
      GROUP BY category
    `);
    const [monthlyData] = await db.promise().query(`
      SELECT
      MONTH(created_at) AS month_num,
      DATE_FORMAT(MIN(created_at),'%b') AS month,
      COUNT(*) AS students
      FROM registrations
      GROUP BY MONTH(created_at)
      ORDER BY month_num
    `);
    // const [monthlyData] = await db.promise().query(`
    //   SELECT
    //   DATE_FORMAT(created_at,'%b') AS month,
    //   COUNT(*) AS students
    //   FROM registrations
    //   GROUP BY MONTH(created_at)
    //   ORDER BY MONTH(created_at)
    // `);

    res.json({
      totalEvents: events[0].total,
      totalStudents: students[0].total,
      totalFaculties: faculties[0].total,
      totalRegistrations: registrations[0].total,
      upcomingEvents: upcoming[0].total,
      registrationData,
      categoryData,
      monthlyData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Analytics Error"
    });
  }
};




// ==============================
// GET ALL EVENTS FOR ADMIN
// ==============================

exports.getAdminEvents = (req, res) => {

  const query =
    "SELECT * FROM events";





  db.query(
    query,

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Fetch Events"

        });

      }





      res.status(200).json(result);

    }

  );

};

exports.sendAdminNotification =
(req, res) => {

  const {
    title,
    message,
    target_role
  } = req.body;

  const query = `
    INSERT INTO
    admin_notifications
    (
      title,
      message,
      target_role
    )
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [
      title,
      message,
      target_role
    ],
    (err) => {

      if (err) {

        return res.status(500)
          .json({
            message:
            "Failed To Send Notification"
          });

      }

      res.status(200).json({
        message:
        "Notification Sent Successfully"
      });

    }
  );

};