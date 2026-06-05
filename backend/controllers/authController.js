const db = require("../config/db");

const bcrypt = require("bcryptjs");

require("dotenv").config();

const generateToken =
  require("../utils/generateToken");




// ==============================
// REGISTER USER
// ==============================

exports.registerUser = async (req, res) => {

  try {

    const {

      name,
      email,
      password,
      role

    } = req.body;





    // Check Empty Fields

    if (

      !name ||
      !email ||
      !password ||
      !role

    ) {

      return res.status(400).json({

        message:
          "All fields are required"

      });

    }





    // Check Existing User

    const checkQuery =
      "SELECT * FROM users WHERE email = ?";





    db.query(

      checkQuery,

      [email],

      async (err, result) => {

        if (err) {

          return res.status(500).json({

            message:
              "Database Error"

          });

        }





        // User Already Exists

        if (result.length > 0) {

          return res.status(400).json({

            message:
              "User already exists"

          });

        }





        // Hash Password

        const hashedPassword =
          await bcrypt.hash(password, 10);





        // Insert User

        const insertQuery =
          `
          INSERT INTO users
          (name, email, password,role)

          VALUES (?, ?, ?,?)
          `;





        db.query(

          insertQuery,

          [

            name,
            email,
            hashedPassword,
            role

          ],

          (err, result) => {

            if (err) {

              return res.status(500).json({

                message:
                  "Registration Failed"

              });

            }





            res.status(201).json({

              message:
                "Registration Successful"

            });

          }

        );

      }

    );

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};




// ==============================
// LOGIN USER
// ==============================

exports.loginUser = (req, res) => {

  try {

    const {

      email,
      password

    } = req.body;





    // Check Empty Fields

    if (

      !email ||
      !password

    ) {

      return res.status(400).json({

        message:
          "All fields are required"

      });

    }





    // Find User

    const query =
      "SELECT * FROM users WHERE email = ?";





    db.query(

      query,

      [email],

      async (err, result) => {

        if (err) {

          return res.status(500).json({

            message:
              "Database Error"

          });

        }





        // User Not Found

        if (result.length === 0) {

          return res.status(400).json({

            message:
              "Invalid Email"

          });

        }





        const user = result[0];





        // Compare Password

        const isMatch =
          await bcrypt.compare(

            password,

            user.password

          );





        if (!isMatch) {

          return res.status(400).json({

            message:
              "Invalid Password"

          });

        }





        // Generate JWT Token

        const token =
          generateToken(user);





        // Success Response

        res.status(200).json({

          message:
            "Login Successful",

          token,

          user: {

            id: user.id,

            name: user.name,

            email: user.email,

            role: user.role

          }

        });

      }

    );

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};