const nodemailer = require("nodemailer");
require("dotenv").config();


// for Contact 
const sendEmail = async (data) => {
  console.log("data---",data)
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
      from: `"FORK & JSA Restaurant" <${data.email}>`,
      to: process.env.EMAIL_ID,
      
      subject: data.subject,
      html: data.body,
    });
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

// for order
const sendEmailOrderConfirm = async (data) => {
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
      to: data.email,
      from:  `"FORK & JSA Restaurant-Order" <${ process.env.EMAIL_ID}>`,
      subject: data.subject,
      html: data.body,
    });
    console.log("Mail sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};



module.exports= {sendEmail,sendEmailOrderConfirm}


