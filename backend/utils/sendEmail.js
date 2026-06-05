const nodemailer = require("nodemailer");

require("dotenv").config();




// ==============================
// CREATE TRANSPORTER
// ==============================

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});




// ==============================
// SEND EMAIL FUNCTION
// ==============================

const sendEmail = async (

  to,
  subject,
  text

) => {

  try {





    const mailOptions = {

      from: process.env.EMAIL_USER,

      to,

      subject,

      text

    };





    const info =
      await transporter.sendMail(
        mailOptions
      );





    console.log(

      "Email Sent:",
      info.response

    );

  } catch (error) {

    console.log(

      "Email Failed:",
      error.message

    );

  }

};




module.exports = sendEmail;