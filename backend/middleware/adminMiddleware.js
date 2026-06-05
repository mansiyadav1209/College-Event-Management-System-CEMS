const adminMiddleware = (req, res, next) => {

  try {





    // Check User Exists

    if (!req.user) {

      return res.status(401).json({

        message:
          "Unauthorized Access"

      });

    }





    // Check Admin Role

    if (req.user.role !== "admin") {

      return res.status(403).json({

        message:
          "Access Denied. Admin Only"

      });

    }





    // Continue

    next();

  } catch (error) {

    res.status(500).json({

      message:
        "Server Error"

    });

  }

};




module.exports = adminMiddleware;