// Dashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../utills/OrderSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Order.Order);
  const user = useSelector((state) => state.Order.user);
  const loading = useSelector((state) => state.Order.loading);
  const error = useSelector((state) => state.Order.error);
  console.log("ui----",orders)

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{user.username}</td>
              <td>{order.total}</td>
              <td>{order.timestamp}</td>
              {order.payment && <td>Paid</td>}
              <td>{order.status}</td>
              <td>
                <select value="" onChange={(e) => handleUpdateStatus(order._id, e.target.value)}>
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
