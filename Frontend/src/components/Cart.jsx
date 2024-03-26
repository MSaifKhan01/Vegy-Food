import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
// import { clearCart } from "../utills/cartSlice";
import CheckoutCart from "./CheckOutCart";
import { GetCartItems } from "../utills/cartSlice.js";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  console.log("from cart page ", cartItems);

  const dispatch=useDispatch()
  const handleClearCart=()=>{
    dispatch(clearCart())
  }

  useEffect(()=>{
    dispatch(GetCartItems())

  },[])
  
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
      {cartItems.map((item, index) => (
        <CartItem key={index} {...item} />
      ))}
      <h1 className="p-2 font-bold text-3xl">This is the Cart page</h1>
      < CheckoutCart />
    </div>
  );
};

export default Cart;
