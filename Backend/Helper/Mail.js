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




// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendEmail = async (data) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     auth: {
//       user: "msaifkhan5038@gmail.com",
//       pass: "jjdw cinx jiyy jjpt",
//     },
//   });

//   try {
//     await transporter.sendMail({
//       to: "msaifkhan5038@gmail.com",
//       from: data.email,
//       subject: data.subject,
//       html: data.body,
//     });
//     console.log("Mail sent successfully");
//   } catch (err) {
//     console.error("Error sending email:", err);
//   }
// };



// module.exports= {sendEmail}

// const emailData = {
//     email: userData.email,
//     subject: 'Order Confirmation - Vegy-Food',
//     body: `
//   <html>
//     <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//       <h2>Order Confirmation</h2>
//       <p>Dear ${userData.username},</p>
//       <p>Your order has been successfully placed with Triveous Ecommerce. Below are the order details:</p>
//       <ul>
//        <li>status: ${newOrder.orderStatus.status}</li>
//        <li>Description: ${newOrder.orderStatus.description}</li>
//        <li>Time: ${newOrder.orderStatus.timestamp.toLocaleTimeString()}</li>

//        <li><h3>Your Total Amount is <b> ${newOrder.total} </b> </h3></li>
//       </ul>
//       <p>Thank you for shopping with us!</p>
//       <p>Best regards,</p>
//       <p>The Triveous Ecommerce Team</p>
//     </body>
//   </html>
// `,
// };

// // Send the order confirmation email
// sendEmail(emailData);



