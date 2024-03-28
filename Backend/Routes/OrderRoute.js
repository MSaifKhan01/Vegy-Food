require("dotenv").config()
const express = require("express");


const stripe = require("stripe")(process.env.stripe_Secret_key);

const OrderRouter = express.Router();

OrderRouter.post("/Check-out", async (req, res) => {
    const data = req.body;

    // Define delivery fee, platform fee, and GST rate
    const deliveryFee = 20; 
    const platformFee = 5; 
    const gstRate = 0.18; // GST rate of 18%

    // Calculate subtotal of the products
    const subTotal = data.cartItems.reduce(
        (total, item) => total + (item.Product.price * item.Quantity),
        0
    );

    // Calculate GST amount
    const gstAmount = subTotal * gstRate;

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
            unit_amount: gstAmount , // Convert to cents
        },
        quantity: 1,
    });

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:1234/',
        cancel_url: 'https://example.com/cancel',
    });

    // Return the session ID to the client
    res.json({ id: session.id });
});

module.exports = OrderRouter;
