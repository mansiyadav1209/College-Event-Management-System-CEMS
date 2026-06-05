const db = require("../config/db");




// ==============================
// GET ALL NOTIFICATIONS
// ==============================

exports.getNotifications = (req, res) => {

  const query =
    `
    SELECT *
    FROM notifications
    ORDER BY created_at DESC
    `;





  db.query(
    query,

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Fetch Notifications"

        });

      }





      res.status(200).json(result);

    }

  );

};




// ==============================
// ADD NOTIFICATION
// ==============================

exports.addNotification = (req, res) => {

  const {
    title,
    message
  } = req.body;





  // Validation

  if (
    !title ||
    !message
  ) {

    return res.status(400).json({

      message:
        "All fields are required"

    });

  }





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

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Add Notification"

        });

      }





      res.status(201).json({

        message:
          "Notification Added Successfully"

      });

    }

  );

};




// ==============================
// DELETE NOTIFICATION
// ==============================

exports.deleteNotification = (req, res) => {

  const { id } = req.params;





  const query =
    `
    DELETE FROM notifications
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Delete Notification"

        });

      }





      res.status(200).json({

        message:
          "Notification Deleted Successfully"

      });

    }

  );

};




// ==============================
// GET SINGLE NOTIFICATION
// ==============================

exports.getSingleNotification = (req, res) => {

  const { id } = req.params;





  const query =
    `
    SELECT *
    FROM notifications
    WHERE id = ?
    `;





  db.query(
    query,
    [id],

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Fetch Notification"

        });

      }





      if (result.length === 0) {

        return res.status(404).json({

          message:
            "Notification Not Found"

        });

      }





      res.status(200).json(result[0]);

    }

  );

};




// ==============================
// UPDATE NOTIFICATION
// ==============================

exports.updateNotification = (req, res) => {

  const { id } = req.params;





  const {
    title,
    message
  } = req.body;





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

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message:
            "Failed to Update Notification"

        });

      }





      res.status(200).json({

        message:
          "Notification Updated Successfully"

      });

    }

  );

};

exports.sendNotification = (req, res) => {

  console.log("BODY:", req.body);

  const { event_id, message } = req.body;

  const query = `
    INSERT INTO notifications
    (event_id, message)
    VALUES (?, ?)
  `;

  db.query(
    query,
    [event_id, message],
    (err, result) => {

      console.log("ERROR:", err);
      console.log("RESULT:", result);

      if (err) {
        return res.status(500).json({
          message: "Failed",
          error: err.sqlMessage
        });
      }
      
      
      res.json({
        message: "Notification Sent"
      });
    }
  );
};



exports.getStudentNotifications = (req, res) => {

  const userId = req.params.userId;

  const eventQuery = `
    SELECT
      n.id,
      n.message,
      n.created_at,
      e.title AS event_title,
      'event' AS type
    FROM notifications n
    JOIN registrations r
      ON n.event_id = r.event_id
    JOIN events e
      ON e.id = n.event_id
    WHERE r.user_id = ?
  `;

  const adminQuery = `
    SELECT
      id,
      title,
      message,
      created_at,
      'admin' AS type
    FROM admin_notifications
    WHERE target_role IN ('student','all')
  `;

  db.query(eventQuery, [userId], (err, eventNotifications) => {

    if (err) {
      return res.status(500).json(err);
    }

    db.query(adminQuery, (err, adminNotifications) => {

      if (err) {
        return res.status(500).json(err);
      }

      const notifications = [
        ...eventNotifications,
        ...adminNotifications
      ].sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      );

      res.json(notifications);

    });

  });

};

exports.sendAdminNotification = (req, res) => {

  console.log("BODY:", req.body);

  const { title, message, target_role } = req.body;

  const query = `
    INSERT INTO admin_notifications
    (title, message, target_role)
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [title, message, target_role],
    (err, result) => {

      console.log("ERROR:", err);
      console.log("RESULT:", result);

      if (err) {
        return res.status(500).json({
          message: "Failed to Send Notification"
        });
      }

      res.status(201).json({
        message: "Notification Sent Successfully"
      });

    }
  );
};

exports.getFacultyNotifications = (req, res) => {

  const query = `
    SELECT *
    FROM admin_notifications
    WHERE target_role IN ('faculty','all')
    ORDER BY created_at DESC
  `;

  db.query(query, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Notifications"
      });
    }

    res.json(result);

  });

};