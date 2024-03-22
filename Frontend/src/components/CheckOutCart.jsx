import React from "react";
import { useSelector } from "react-redux";
// import store from "../utills/store";

const CheckoutCart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  let TotalPrice= cartItems.reduce((total,item)=>total+(item.price/100),0)
  console.log("from checkout", cartItems);
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <div className="flex items-center">
                <img
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/" +
                    item.imageId
                  }
                  alt={item.name}
                  className="w-12 h-12 object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">Rs {item.price/100}</p>
                </div>
              </div>
              <p className="font-semibold">Rs {(item.price/100).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-semibold">Rs {(TotalPrice).toFixed(2)}</p>
      </div>
      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Checkout
      </button>
    </div>
  );
};



export default CheckoutCart;
