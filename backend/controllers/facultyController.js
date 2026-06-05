const db = require("../config/db");

exports.getFacultyProfile = (req, res) => {

  const { id } = req.params;

  db.query(
    `
    SELECT
      id,
      name,
      email,
      phone,
      department
    FROM users
    WHERE id = ?
    `,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

};

exports.updateFacultyProfile = (req, res) => {

  const { id } = req.params;

  const {
    phone,
    department
  } = req.body;

  db.query(
    `
    UPDATE users
    SET
      phone = ?,
      department = ?
    WHERE id = ?
    `,
    [phone, department, id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Profile Updated Successfully"
      });

    }
  );

};

exports.getFacultyStats = (req, res) => {

  const facultyId = req.params.id;

  const eventsQuery = `
    SELECT COUNT(*) AS total
    FROM events
    WHERE faculty_id = ?
  `;

  const studentsQuery = `
    SELECT COUNT(*) AS total
    FROM registrations r
    JOIN events e
      ON r.event_id = e.id
    WHERE e.faculty_id = ?
  `;

  const notificationsQuery = `
    SELECT COUNT(*) AS total
    FROM admin_notifications
    WHERE target_role IN ('faculty','all')
  `;

};