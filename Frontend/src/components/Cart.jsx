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

  // Function to fetch cart items
  const fetchCartItems = () => {
    dispatch(GetCartItems());
  };

  // Dispatch GetCartItems action on component mount and then repeatedly every 1 seconds
  useEffect(() => {
    fetchCartItems(); // Initial fetch
    const intervalId = setInterval(fetchCartItems, 1000); // Fetch every 1 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

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
     
      <div className="flex m-2 gap-4">
         <div className="w-3/5">
      {cartItems.map((item, index) => (
        <CartItem key={index} product={item.Product}  Quantity={item.Quantity}/>
      ))}
  
    </div>
    <CheckoutCart  />
    </div>
      ) : (
      
        <EmptyCart />
      )}
    
    </div>
  );
};

export default Cart;
