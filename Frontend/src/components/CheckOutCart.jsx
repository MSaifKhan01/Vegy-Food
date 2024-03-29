import React from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutCart = () => {
  const cartItems = useSelector((store) => store.cart.items) ?? [];

  // console.log("from checkhout---------------------------------",cartItems)
  const deliveryFee = 20;
  const platformFee = 5.004;
  const gstRate = 0.18; // GST rate of 18%

  const subTotal = cartItems.reduce(
    (total, item) => total + (item.Product.price / 100) * item.Quantity,
    0
  );
  const gstAndCharges = subTotal * gstRate;
  const totalBill = subTotal + deliveryFee + platformFee + gstAndCharges;

  const MakePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OzL7GSFsBLrRIll1M7ewanBUR1PQDjVSjPwPe1yqzny0zaMbY2DvSSJyY6pg43EJkQghqX7iV55uGFOzGL0HTxd00jTi9AaYH"
    );
    // const stripe= await loadStripe("pk_test_51OzfzPSESQmVp4CxeqTy9lQh3phl6er5zSdb2q6xLq4Euk8j8uj3q78wbRSo3tVbdFLvv8AfzUSOjILRlmOfOk3j00FYdDU6QL")

    try {
      const token = sessionStorage.getItem("token");
      const userDataJSON = sessionStorage.getItem("User");
      const userData = JSON.parse(userDataJSON);
      const data = {
        cartItems,
        userData,
      };

      const response = await fetch(`http://localhost:4000/order/Check-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const session = await response.json();

      if (session.error) {
        console.error("Error creating Stripe Checkout Session:", session.error);
        // Handle the error, e.g., display an error message to the user
      } else {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error("Error redirecting to checkout:", result.error);
          // Handle the error, e.g., display an error message to the user
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle other errors, e.g., network errors
    }
  };

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
          <p className="font-semibold text-gray-800">
            ₹ {deliveryFee.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">Platform Fee:</p>
          <p className="font-semibold text-gray-800">
            ₹ {platformFee.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600">GST and Restaurant Charges:</p>
          <p className="font-semibold text-gray-800">
            ₹ {gstAndCharges.toFixed(2)}
          </p>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-between">
          <p className="text-lg font-semibold">TO PAY:</p>
          <p className="text-lg font-semibold text-red-600">
            ₹ {totalBill.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          MakePayment();
        }}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutCart;
