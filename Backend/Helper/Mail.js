const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      to: process.env.EMAIL_ID,
      from: data.email,
      subject: data.subject,
      html: data.body,
    });
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};



module.exports= {sendEmail}


