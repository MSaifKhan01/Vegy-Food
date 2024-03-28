const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending',
    },
    timestamp: { type: Date, default: Date.now },
    description: { type: String },
});

const paymentSchema = new mongoose.Schema({
    cardholderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    email: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    CartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    }],
    Address: { type: String },
    orderStatus: orderStatusSchema,
    total: { type: Number, required: true },
    paymentDetails: paymentSchema,
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };
