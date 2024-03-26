const express = require("express");
const {CartModel} = require("../Model/CartSchema");

const CartRouter = express.Router();
CartRouter.post("/Add-toCart/:productID", async (req, res) => {
    const userID = req.userID; 
    const { productID } = req.params;
    console.log(req.body)
    console.log(userID, productID);
  

    try {
        const cartItem = await CartModel.findOne({ UserID: userID, "Product.id": productID });

        if (cartItem) {
            return res.status(400).send({ msg: "Product Already in the Cart" });
        }

        const newCartItem = new CartModel({
            UserID: userID,
            Product: req.body,  // Assuming Product is the entire product object
        });

        await newCartItem.save();

        return res.status(200).json({ msg: "Product Added to Cart Successfully", newCartItem });
    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        return res.status(500).send({ msg: "Internal Server Error", error: error.message });
    }
});



CartRouter.get("/Cart-data", async (req, res) => {
    try {
        const userID = req.userID; 
        const cartItems = await CartModel.find({ UserID: userID }); 

        if (cartItems.length === 0) {
            return res.status(404).json({ message: "No cart items found for the user" });
        }

        return res.status(200).json({ CartItems: cartItems });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = CartRouter;
