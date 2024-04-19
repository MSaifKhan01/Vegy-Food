import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import CheckoutCart from "./CheckOutCart";
import { ClearCart, GetCartItems } from "../utills/cartSlice.js";
import EmptyCart from "./EmptyCart.jsx";
import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  
    dispatch(ClearCart());
    toast.success('Cart cleared successfully');
  };

  let isOnline = useOnline();
  if (!isOnline) {
    return <UserOffline />;
  }

  return (
    <div className="p-4 m-4">
     
      {cartItems && cartItems.length > 0 ? (
     
     <div>
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
       <div className="flex m-2 gap-4">
         <div className="w-3/5">
      {cartItems.map((item, index) => (
       
   
        <CartItem key={index} Item={item}  Quantity={item.Quantity}/>
      ))}


    </div>
    <CheckoutCart  />
    </div>
     </div>
      ) : (
      
        <EmptyCart />
      )}
    
    </div>
  );
};

export default Cart;
