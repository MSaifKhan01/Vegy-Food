const mongoose = require("mongoose");
const moment = require('moment-timezone');


const orderSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
     
    CartItems: [],
    // Address: { type: String },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered','Canceled'],
        default: 'Pending',
    },
    timestamp:  { 
        type: String, 
        default: () => moment().tz('Asia/Kolkata').format('DD/MM/YYYY hh:mm:ss A') 
    },
    total: { type: Number, required: true },
    
    payment: { type: Boolean, default: false }
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };
