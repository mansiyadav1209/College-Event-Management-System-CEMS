const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get All Faculties
router.get("/", (req, res) => {

  db.query(
    "SELECT id,name,email FROM users WHERE role='faculty'",
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }
  );

});

// Get Faculty Profile
router.get("/profile/:id", (req, res) => {

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

      if (err) return res.status(500).json(err);

      res.json(result[0]);

    }
  );

});

// Update Faculty Profile
router.put("/profile/:id", (req, res) => {

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

      if (err) return res.status(500).json(err);

      res.json({
        message: "Profile Updated Successfully"
      });

    }
  );

});

module.exports = router;