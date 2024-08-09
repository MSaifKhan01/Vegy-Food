require("dotenv").config();
const express = require("express");
const { orderModel } = require("../Model/OrderSchema");
const { CartModel } = require("../Model/CartSchema");
const { sendEmailOrderConfirm } = require("../Helper/Mail");
const { RoleBase } = require("../Middleware/RoleBase");
const { UserModel } = require("../Model/userSchema");

const stripe = require("stripe")(process.env.stripe_Secret_key);

const OrderRouter = express.Router();

OrderRouter.post("/Check-out", async (req, res) => {
  const data = req.body;
  const userID = req.userID;

  // Define delivery fee, platform fee, and GST rate
  const deliveryFee = 20;
  const platformFee = 5;
  const gstRate = 0.18; // GST rate of 18%

  // Calculate subtotal of the products
  const subTotal = data.cartItems.reduce(
    (total, item) => total + item.Product.price * item.Quantity,
    0
  );

  // Calculate GST amount
  const gstAmount = (subTotal * gstRate)/100;

  // Calculate total including delivery fee, platform fee, and GST
  const totalAmount = subTotal + deliveryFee + platformFee + gstAmount;

    
    
   

  // Prepare line items for Stripe Checkout Session
  const lineItems = data.cartItems.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.Product.name,
      },
      unit_amount: product.Product.price, // Convert to cents
    },
    quantity: product.Quantity,
  }));

  // Add delivery fee as a line item
  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Delivery Fee | 4.9 kms",
      },
      unit_amount: deliveryFee * 100, // Convert to cents
    },
    quantity: 1,
  });

  // Add platform fee as a line item
  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Platform Fee",
      },
      unit_amount: platformFee * 100, // Convert to cents
    },
    quantity: 1,
  });

  // Add GST as a line item
  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "GST",
      },
      unit_amount:Math.round(gstAmount * 100), // Convert to cents
    },
    quantity: 1,
  });

  // Create a Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    // success_url: "http://localhost:1234/",
    success_url: "https://vegy-food.vercel.app/",
    cancel_url: "https://example.com/cancel",
  });
  console.log("----------------",session,"---------------")
if(session.id){
  
  let orderDataObject = {
    UserID: userID,
    CartItems: data.cartItems,
    total: data.totalBill.toFixed(2),
    payment: true,
  };

  // Create a new order instance
  const newOrder = new orderModel(orderDataObject);
  await newOrder.save();



  // deleting cartItems after order confirm
  await CartModel.deleteMany({ UserID: userID });

  // for sending mail order Confirmation
  orderConfirmationMail(data);
//   console.log("--------",data,totalAmount,"-------------------")
}




//   Return the session ID to the client
  res.json({ id: session.id });
});



function orderConfirmationMail(data) {
    const emailData = {
        email: data.userData.email,
        subject: "Order Confirmation - FORK & JSA Restaurant",
        body: `
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 10px 20px;">
                    <h2 style="color: #333;">Thank You for your Order </h2>
                    
                    <p>Dear <span style="font-weight: bold; color: #4CAF50; font-size: larger;">${data.userData.username}</span>,</p>

                    <p>Your order has been successfully Confirmed with FORK & JSA Restaurant. <span style="font-weight: bold; color: #4CAF50; font-size: larger;">Below are the order details</span>:</p>
                    
                    <table style="border-collapse: collapse; width: 100%;">
                        <thead style="background-color: #f2f2f2;">
                            <tr>
                                <th style="padding: 8px; text-align: left;">Name</th>
                                <th style="padding: 8px; text-align: left;">Price/item</th>
                                <th style="padding: 8px; text-align: left;">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.cartItems
                                .map(
                                    (item) => `
                                        <tr>
                                            <td style="border: 1px solid #ddd; padding: 8px;">${item.Product.name}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px;">${(item.Product.price/100).toFixed(2)}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px;">${item.Quantity}</td>
                                        </tr>
                                    `
                                )
                                .join("")}
                            <tr>
                                <td colspan="3" style="border: 1px solid #ddd; padding: 8px;">Status: <span style="font-weight: bold; color: #EF5350;">Pending</span></td>
                            </tr>
                            <tr>
                                <td colspan="3" style="border: 1px solid #ddd; padding: 8px;">Time: ${new Date().toLocaleTimeString()}</td>
                            </tr>
                            <tr>
                                <td colspan="3" style="border: 1px solid #ddd; padding: 8px;">
                                    <h3 style="font-size: large;">Your Total Amount with All Charges is <b style="color: #ff5722;"> ₹ ${data.totalBill.toFixed(2)}</b></h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <p>Thank you for ordering with us!</p>
                    <p style="font-weight: bold; font-size: larger;">Best regards,</p>
                    <p style="font-size: larger;">FORK & JSA Restaurant Team</p>
                </body>
            </html>
        `,
    };

    // Send the order confirmation email
    sendEmailOrderConfirm(emailData);
}




OrderRouter.get("/get-order", RoleBase(["user", "admin"]), async (req, res) => {
  const userID = req.userID;
  try {
    let userData= await UserModel.findOne({_id:userID})
      let ordersData;
      if (req.userRole === "user") {
          ordersData = await orderModel.find({ UserID: userID }).populate("UserID");
      } else {
          ordersData = await orderModel.find().populate("UserID");;
      }
      res.status(200).send({ordersData,userData});
  } catch (error) {
      res.status(500).send({ msg: error.message });
  }
});

// PATCH route to update order status
OrderRouter.patch('/update-status/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;
  // console.log("-----", newStatus, "-----");
  // console.log("-----", orderId, "-----");

  try {
    let order = await orderModel.findById(orderId).populate("UserID");
    // console.log(order);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (newStatus === 'Canceled') {
      // console.log(newStatus);
      await orderModel.deleteOne({ _id: orderId });
      return res.status(200).json({ message: "Order canceled and removed" });
    } else {
      order.status = newStatus;
      await order.save();
      
      // Prepare email data
      const emailData = {
        email: order.UserID.email,
        subject: 'Order Status Update',
        body: `
          <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

  <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

    <header style="background-color: #009688; color: #fff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="font-size: 24px; margin: 0;">Your Order Status Update</h1>
    </header>

    <div style="padding: 20px;">
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Dear Customer,</p>

      <p style="font-size: 18px; color: #333; font-weight: bold; margin-bottom: 10px;">Your order status has been updated:</p>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Order ID: ${order._id}</p>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">
  <span style="background-color: #ffcc80; padding: 5px; border-radius: 3px;">New Status: ${newStatus}</span>
</p>

      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Total Amount: ₹${order.total}</p>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Order Time: ${order.timestamp}</p>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Payment Status: ${order.payment ? 'Paid' : 'Unpaid'}</p>

      <p class="thank-you" style="color: #009688; background-color: #f0f0f0; padding: 10px; border-radius: 5px; font-weight: bold; margin-top: 20px;">Thank you for choosing FORK & JSA Restaurant!</p>
    </div>

    <footer style="background-color: #f0f0f0; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
      <p style="font-size: 14px; color: #999; margin: 0;">This is an automated message. Please do not reply.</p>
    </footer>

  </div>

</body>

          </html>
      `,
      };

      // Send email
      sendEmailOrderConfirm(emailData);

      return res.status(200).json({ message: "Order status updated successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});







  

module.exports = OrderRouter;
