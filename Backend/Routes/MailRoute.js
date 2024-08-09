const express = require("express");
const { sendEmail } = require("../Helper/Mail");

const MailRouter = express.Router();

MailRouter.post("/", (req, res) => {
  const { email, message, username } = req.body;
  // console.log(email,message,username)

  const userData = {
    email: email,
    subject: "FORK & JSA Restaurant Contact",
    body: `
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">Message from <span style="color: #009688;">${username}</span></h2>
        
        <p style="font-weight: bold; color: #666;">Message: ${message}</p>
        <p style="color: #666;">Please respond to this message promptly. Click <a href="mailto:${email}" style="color: red; text-decoration: underline;">here</a> to reply.</p>
        <p style="color: #666; font-style: italic; font-size: 22px;">Best regards,</p>
        
        <p style="color: #009688; background-color: #f0f0f0; padding: 10px; border-radius: 5px; font-weight: bold; font-size: 18px;">FORK & JSA Restaurant Team</p>


    </body>
</html>

          `,
  };

  sendEmail(userData);

  res.send("email sent succesfully");
});

module.exports = { MailRouter };
