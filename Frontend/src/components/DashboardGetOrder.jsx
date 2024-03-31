import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [User, setUser] = useState({});

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
      console.log(result)
      setOrders(result.ordersData); // Set orders using the response data
      setUser(result.userData)
      
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      await fetch(`http://localhost:4000/order/update-status/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders(); // Refresh orders after updating status
    } catch (error) {
      console.error('Error updating order status:', error);
    }
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
            <th>User Name</th>
            <th>Amount</th>
            <th>Time</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {orders.map(order => (
  <tr key={order._id}>
    <td>{order._id}</td>
    <td>{User.username}</td>
    <td>{order.total}</td>
    <td>{order.timestamp}</td>
    {order.payment && <td>Paid</td>}
    <td>{order.status}</td>
    <td>
      <select
        value={""}
        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
      >
        <option value="">Update Status</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Canceled">Canceled</option>
      </select>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
