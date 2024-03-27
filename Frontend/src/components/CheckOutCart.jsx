import React from "react";
import { useSelector } from "react-redux";

const CheckoutCart = () => {
  const cartItems = useSelector((store) => store.cart.items) ?? [];
  const deliveryFee = 20; 
  const platformFee = 5.004; 
  const gstRate = 0.18; // GST rate of 18%

  const subTotal = cartItems.reduce(
    (total, item) => total + (item.Product.price / 100)*item.Quantity,
    0
  );
  const gstAndCharges = subTotal * gstRate;
  const totalBill = subTotal + deliveryFee + platformFee + gstAndCharges;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-2/5">
      <h2 className="text-xl font-semibold mb-4">Bill Details of Your Cart</h2>
      <div className="mt-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Item Total:</p>
          <p className="font-semibold text-gray-800">₹ {subTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">Delivery Fee | 4.9 kms:</p>
          <p className="font-semibold text-gray-800">₹ {deliveryFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">Platform Fee:</p>
          <p className="font-semibold text-gray-800">₹ {platformFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">GST and Restaurant Charges:</p>
          <p className="font-semibold text-gray-800">₹ {gstAndCharges.toFixed(2)}</p>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-between">
          <p className="text-lg font-semibold">TO PAY:</p>
          <p className="text-lg font-semibold text-red-600">₹ {totalBill.toFixed(2)}</p>
        </div>
      </div>
      <button className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
        Checkout
      </button>
    </div>
  );
};

export default CheckoutCart;
