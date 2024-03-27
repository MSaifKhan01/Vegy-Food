import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import CheckoutCart from "./CheckOutCart";
import { GetCartItems } from "../utills/cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Dispatch GetCartItems action on component mount
  useEffect(() => {
    dispatch(GetCartItems());
  }, [dispatch]);

  useEffect(() => {
    // Calculate total price when cart items change
    if (cartItems && cartItems.length > 0) {
      const total = cartItems.reduce((acc, curr) => acc + curr.Product.price / 100, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  const handleClearCart = () => {
    // Implement logic to clear cart
    // dispatch(clearCart());
  };

  return (
    <div className="p-4 m-4">
      <div className="flex justify-center">
        <button
          className="p-2 m-2 bg-green-400 rounded-md"
          onClick={() => {
            handleClearCart();
          }}
        >
          Clear Cart
        </button>
      </div>
      {cartItems && cartItems.length > 0 ? (
        // Render cart items if cartItems is not empty
      <div className="flex m-2 gap-4">
         <div className="w-3/5">
      {cartItems.map((item, index) => (
        <CartItem key={index} {...item.Product} />
      ))}
      {/* <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">Rs {totalPrice.toFixed(2)}</p>
       
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Checkout
        </button>
      </div> */}
    </div>
    <CheckoutCart  />
    </div>
      ) : (
        // Render EmptyCart component if cartItems is empty
        <EmptyCart />
      )}
      {/* <h1 className="p-2 font-bold text-3xl">This is the Cart page</h1>
      <CheckoutCart /> */}
    </div>
  );
};

export default Cart;
