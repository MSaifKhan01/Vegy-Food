const Razorpay = require("razorpay");
require("dotenv").config();

const express = require("express");
const PaymentVerifyRouter = express.Router();
// Create a new instance of Razorpay client
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});



// PaymentVerifyRouter.post("/paymentverification", async (req, res) => {
//     console.log("from verification :---",req.body)
//     // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     //   req.body;
  
//     // const body = razorpay_order_id + "|" + razorpay_payment_id;
  
//     // const expectedSignature = crypto
//     //   .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//     //   .update(body.toString())
//     //   .digest("hex");
  
//     // const isAuthentic = expectedSignature === razorpay_signature;
  
//     // if (isAuthentic) {
//     //   // Database comes here
  
//     //   // await Payment.create({
//     //   //   razorpay_order_id,
//     //   //   razorpay_payment_id,
//     //   //   razorpay_signature,
//     //   // });
  
  
//     //   let orderDataObject = {
//     //     UserID: userID,
//     //     CartItems: data.cartItems,
//     //     total: data.totalBill.toFixed(2),
//     //     payment: true,
//     //   };
    
//     //   // Create a new order instance
//     //   const newOrder = new orderModel(orderDataObject);
//     //   await newOrder.save();
    
    
    
//     //   // deleting cartItems after order confirm
//     //   await CartModel.deleteMany({ UserID: userID });
  
//     //   res.redirect(
//     //     `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//     //   );
//     // } else {
//     //   res.status(400).json({
//     //     success: false,
//     //   });
//     // }
//   });

// module.exports = { instance,PaymentVerifyRouter };
