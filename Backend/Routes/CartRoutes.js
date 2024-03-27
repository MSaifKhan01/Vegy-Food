const express = require("express");
const { CartModel } = require("../Model/CartSchema");

const CartRouter = express.Router();

// Add to Cart Route
CartRouter.post("/Add-toCart/:productID", async (req, res) => {
  const userID = req.userID;
  const { productID } = req.params;
  console.log(req.body);
  console.log(userID, productID);

  try {
    const cartItem = await CartModel.findOne({ UserID: userID, "Product.id": productID });

    if (cartItem) {
      return res.status(400).send({ msg: "Product Already in the Cart" });
    }

    const newCartItem = new CartModel({
      UserID: userID,
      Product: req.body, // Assuming Product is the entire product object
    });

    await newCartItem.save();

    return res.status(200).json({ msg: "Product Added to Cart Successfully", newCartItem });
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return res.status(500).send({ msg: "Internal Server Error", error: error.message });
  }
});

// Get Cart Data Route
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

// Increase Quantity Route
CartRouter.patch("/inc-qty/:productID", async (req, res) => {
  
  try {
    const { productID } = req.params;
    console.log("--------",productID,)
    const userID = req.userID;
    const item = await CartModel.findOne({ UserID: userID, "Product.id": productID });

    if (!item) {
      return res.status(404).json({ msg: "Product Not Found in Cart" });
    }

    if (item.Quantity > 0) {
      item.Quantity++;
      await item.save();
      return res.status(200).json({ msg: "Product Quantity Increased" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
});

// Decrease Quantity Route
CartRouter.patch("/dec-qty/:productID", async (req, res) => {
  try {
    const { productID } = req.params;
    const userID = req.userID;
    const item = await CartModel.findOne({ UserID: userID, "Product.id": productID });

    if (!item) {
      return res.status(404).json({ msg: "Product Not Found in Cart" });
    }

    if (item.Quantity > 1) {
      item.Quantity--;
      await item.save();
      return res.status(200).json({ msg: "Product Quantity Decreased" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
});

// Remove Item Route
CartRouter.delete("/remove-item/:productID", async (req, res) => {
  try {
    const { productID } = req.params;
    const userID = req.userID;
    const item = await CartModel.findOne({ UserID: userID, "Product.id": productID });

    if (!item) {
      return res.status(404).json({ msg: "Product Not Found in Cart" });
    }

    await CartModel.findOneAndDelete({ UserID: userID, "Product.id": productID });

    return res.status(200).json({ msg: "Product Removed Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      msg: error.message,
    });
  }
});

module.exports = CartRouter;
