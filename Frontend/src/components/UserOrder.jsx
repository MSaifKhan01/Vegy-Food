import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  updateOrderStatus } from '../utills/OrderSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Order.Order);
  // console.log("------", orders);

  const handleCancelOrder =async (orderId) => {
    let newStatus="Canceled"
    let action=await dispatch(updateOrderStatus({ orderId, newStatus }));
    // console.log(action)

    // toast.success( action.payload.result.msg);

    if(action.meta.requestStatus==="fulfilled" && action.payload.newStatus
    ==="Canceled"){
      toast.success("Order Canceled successfully!");
      // window.location.href = "http://localhost:1234/order";
      window.location.href = "https://vegy-food.vercel.app/order";
    }else{
      toast.error( ` Order not Canceled`);
    }
  };

 

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-red-400 text-center ">Your Orders</h1>
      {orders.map((order,index) => (
        <div key={order._id} className="order bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-red-400 text-center">Order No: {index+1}</h3>
          <h3 className="text-lg font-bold mb-4">Order ID: {order._id}</h3>
          <p className="text-gray-700 mb-2">Total Price : ₹{order.total}</p>
          <p className="text-gray-700 mb-6">Status: {order.status}</p>
          <button onClick={(()=>{
            handleCancelOrder(order._id)
          })} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600">Cancel Order</button>

          <h4 className="text-lg font-bold mt-8 mb-4">Items:</h4>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border-r border-gray-400">Product</th> 
                <th className="p-2 border-r border-gray-400">Price</th> 
                <th className="p-2 border-r border-gray-400">Quantity</th> 
                <th className="p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.CartItems.map((cartItem) => (
                <tr key={cartItem._id} className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-400 text-center">{cartItem.Product.name}</td> 
                  <td className="p-2 border-r border-gray-400 text-center">₹ {cartItem.Product.price / 100}</td> 
                  <td className="p-2 border-r border-gray-400 text-center">{cartItem.Quantity}</td> 
                  <td className="p-2 text-center">₹ {(cartItem.Product.price * cartItem.Quantity) / 100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
