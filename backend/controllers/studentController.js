const db = require("../config/db");




// ==============================
// GET STUDENT PROFILE
// ==============================
exports.getStudentProfile = (req, res) => {

  const { id } = req.params;

  const query = `
    SELECT
      id,
      name,
      email,
      role,
      course,
      year,
      phone,
      college
    FROM users
    WHERE id = ?
  `;

  db.query(query, [id], (err, result) => {

    if (err) {

      return res.status(500).json({
        message: "Database Error"
      });

    }

    if (result.length === 0) {

      return res.status(404).json({
        message: "Student Not Found"
      });

    }

    res.status(200).json(result[0]);

  });

};



// ==============================
// UPDATE STUDENT PROFILE
// ==============================
exports.updateStudentProfile = (req, res) => {

  const { id } = req.params;

  const {
    name,
    email,
    course,
    year,
    phone,
    college
  } = req.body;

  const query = `
    UPDATE users
    SET
      name = ?,
      email = ?,
      course = ?,
      year = ?,
      phone = ?,
      college = ?
    WHERE id = ?
  `;

  db.query(

    query,

    [
      name,
      email,
      course,
      year,
      phone,
      college,
      id
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Failed to Update Profile"
        });

      }

      res.status(200).json({
        message: "Profile Updated Successfully"
      });

    }

  );

};




// ==============================
// GET STUDENT REGISTERED EVENTS
// ==============================

exports.getMyEvents = (req, res) => {

  const { id } = req.params;





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
    [id],

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




// ==============================
// DELETE REGISTERED EVENT
// ==============================

exports.removeMyEvent = (req, res) => {

  const {
    user_id,
    event_id
  } = req.body;





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

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Remove Event"

        });

      }





      res.status(200).json({

        message:
          "Event Removed Successfully"

      });

    }

  );

};




// ==============================
// STUDENT DASHBOARD STATS
// ==============================
exports.getDashboardStats = (req, res) => {

  const { id } = req.params;

  const availableEventsQuery =
    "SELECT COUNT(*) AS total FROM events";

  const registeredEventsQuery =
    "SELECT COUNT(*) AS total FROM registrations WHERE user_id = ?";

  const upcomingEventsQuery =
    "SELECT COUNT(*) AS total FROM events WHERE date >= CURDATE()";
    
  const notificationsQuery = `
  SELECT
  (
    (
      SELECT COUNT(*)
      FROM notifications n
      JOIN registrations r
      ON n.event_id = r.event_id
      WHERE r.user_id = ?
    )
    +
    (
      SELECT COUNT(*)
      FROM admin_notifications
      WHERE target_role IN ('student','all')
    )
  ) AS total
`;
  // const notificationsQuery = `
  //   SELECT COUNT(*) AS total
  //   FROM notifications n
  //   JOIN registrations r
  //   ON n.event_id = r.event_id
  //   WHERE r.user_id = ?
  // `;

  const upcomingEventsListQuery = `
    SELECT
      id,
      title,
      date,
      venue
    FROM events
    WHERE date >= CURDATE()
    ORDER BY date ASC
    LIMIT 3
  `;

  db.query(
    availableEventsQuery,
    (err, availableResult) => {

      if (err) {
        return res.status(500).json({
          message: "Database Error"
        });
      }

      db.query(
        registeredEventsQuery,
        [id],
        (err, registeredResult) => {

          if (err) {
            return res.status(500).json({
              message: "Database Error"
            });
          }

          db.query(
            upcomingEventsQuery,
            (err, upcomingResult) => {

              if (err) {
                return res.status(500).json({
                  message: "Database Error"
                });
              }

              db.query(
                upcomingEventsListQuery,
                (err, upcomingListResult) => {

                  if (err) {
                    return res.status(500).json({
                      message: "Database Error"
                    });
                  }

                  db.query(
                    notificationsQuery,
                    [id],
                    (err, notificationResult) => {

                      if (err) {
                        return res.status(500).json({
                          message: "Database Error"
                        });
                      }

                      res.status(200).json({

                        availableEvents:
                          availableResult[0].total,

                        registeredEvents:
                          registeredResult[0].total,

                        upcomingEvents:
                          upcomingResult[0].total,

                        notifications:
                          notificationResult[0].total,

                        upcomingEventsList:
                          upcomingListResult

                      });

                    }
                  );

                }
              );

            }
          );

        }
      );

    }
  );

};

