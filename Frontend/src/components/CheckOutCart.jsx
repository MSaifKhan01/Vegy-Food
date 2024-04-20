import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MakeOrder } from "../utills/OrderSlice";
import { Base_URL } from "../Config";


const CheckoutCart = () => {
  const dispatch= useDispatch()
  const cartItems = useSelector((store) => store.cart.items) ?? [];


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
  
      // const token = sessionStorage.getItem("token");
      const userDataJSON = sessionStorage.getItem("User");
      const userData = JSON.parse(userDataJSON);
      const data = {
        cartItems,
        userData,
        totalBill
      };

      dispatch(MakeOrder(data))

  };

  // const MakePaymentWithRozor = async () => {
  //   const userDataJSON = sessionStorage.getItem("User");
  //   const userData = JSON.parse(userDataJSON);
  //   const token = sessionStorage.getItem("token");
  
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ 
  //       amount: totalBill,
  //       cartItems ,
  //       userData
  //     }) 
  //   };
  
  //   try {
  //     const response = await fetch(`${Base_URL}/order/checkout`, requestOptions);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const { order } = await response.json();
  //     console.log("----oredrrozor",order)
  
  //     const options = {
  //       key: 'rzp_test_9EpNl8SflNpqKy', // Your Razorpay API key
  //       amount: order.amount,
  //       currency: "INR",
  //       name: "FORK & JSA",
  //       description: "FORK & JSA of RazorPay",
  //       image: "https://avatars.githubusercontent.com/u/25058652?v=4",
  //       order_id: order.id,
  //       callback_url: `${Base_URL}/order/paymentverification`,
  //       prefill: {
  //           name: userData.username, // Assuming 'name' is available in 'userData'
  //           email: userData.email, // Assuming 'email' is available in 'userData'
           
  //       },
  //       notes: {
  //           address: "Razorpay Corporate Office",
  //           totalBill,
  //           cartItems,
  //           userData
  //       },
  //       theme: {
  //           color: "#121212"
  //       }
  //     };
  //     const razor = new window.Razorpay(options);
  //     razor.open();
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle error
  //   }
  // };
  

  const MakePaymentWithRozor = async () => {
    const userDataJSON = sessionStorage.getItem("User");
    const userData = JSON.parse(userDataJSON);
    const token = sessionStorage.getItem("token");
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        amount: totalBill,
        cartItems,
        userData
      }) 
    };
  
    try {
      const response = await fetch(`${Base_URL}/order/checkout`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { order } = await response.json();
      console.log("----oredrrozor",order)
  
      const options = {
        key: 'rzp_test_9EpNl8SflNpqKy', // Your Razorpay API key
        amount: order.amount,
        currency: "INR",
        name: "FORK & JSA",
        description: "FORK & JSA of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: `${Base_URL}/paymentverification`,
        prefill: {
          name: userData.username, 
          email: userData.email, 
        },
        notes: {
          address: "Razorpay Corporate Office",
          totalBill,
          cartItems,
          userData
        },
        theme: {
          color: "#121212"
        }
      };
   // Include the authorization token in the headers of the callback request
   const callbackOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      totalBill,
      cartItems,
      userData,
    }),
  };

  const razor = new window.Razorpay(options);
  razor.on("payment.success", function (response) {
    // Payment success logic
    // Send data to callback URL
    fetch(`${Base_URL}/paymentverification`, callbackOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });

  razor.open();
    } catch (error) {
      console.error('Error:', error);
      // Handle error
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

      <button
        onClick={() => {
          MakePaymentWithRozor();
        }}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Make Payment With UPI
      </button>
    </div>
  );
};

export default CheckoutCart;
