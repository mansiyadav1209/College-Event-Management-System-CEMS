const jwt = require("jsonwebtoken");

require("dotenv").config();




// ==============================
// AUTH MIDDLEWARE
// ==============================

const authMiddleware = (req, res, next) => {

  try {





    // Get Token

    const token =
      req.headers.authorization;





    // Check Token

    if (!token) {

      return res.status(401).json({

        message:
          "Access Denied. No Token Provided"

      });

    }





    // Verify Token

    const verified = jwt.verify(

      token,

      process.env.JWT_SECRET

    );





    // Store User Data

    req.user = verified;





    // Continue

    next();

  } catch (error) {

    res.status(401).json({

      message:
        "Invalid or Expired Token"

    });

  }

};




module.exports = authMiddleware;