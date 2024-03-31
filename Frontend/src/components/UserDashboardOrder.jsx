 
 import React, { useState, useEffect } from 'react';
 //  import axios from 'axios';
  
  const UserDashboard = () => {
    const [orders, setOrders] = useState([]);
  
   
  
    const fetchOrders = async () => {
     try {
       const token = sessionStorage.getItem("token");
   
       const response = await fetch("http://localhost:4000/order/get-order", {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
         },
       });
   
       if (!response.ok) {
         throw new Error('Failed to fetch orders');
       }
   
       const result = await response.json();
       setOrders(result.ordersData
         ); // Set orders using the response data
       console.log("orders", orders);
       console.log("result", result);
     } catch (error) {
       console.error('Error fetching orders:', error);
     }
   };
   
  
    const handleUpdateStatus = async (orderId, newStatus) => {
     //  try {
     //    await axios.patch(`/api/orders/update-status/${orderId}`, { status: newStatus });
     //    fetchOrders(); // Refresh orders after updating status
     //  } catch (error) {
     //    console.error('Error updating order status:', error);
     //  }
    };
 
    useEffect(() => {
     fetchOrders();
   }, []);
  
    return (
      <div>
        <h1>Order Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                {order.payment && <td>"Paid"</td>}
                <td>{order.status}</td>
                <td>
                  {order.status !== 'Canceled' && (
                    <button onClick={() => handleUpdateStatus(order._id, 'Canceled')}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default UserDashboard;
  