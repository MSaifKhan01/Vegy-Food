const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }, 
    Product: {
        type:Object
    },
    Quantity: {
        type: Number,
        default: 1,
        required: true
    }
});

const CartModel = mongoose.model("Cart", CartSchema);

module.exports={CartModel}


