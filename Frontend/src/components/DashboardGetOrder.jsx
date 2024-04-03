import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../utills/OrderSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.Order.Order);
  const user = useSelector((state) => state.Order.user);
  const loading = useSelector((state) => state.Order.loading);
  const error = useSelector((state) => state.Order.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4">Error: {error}</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600';
      case 'Shipped':
        return 'text-blue-600';
      case 'Delivered':
        return 'text-green-600';
      case 'Canceled':
        return 'text-red-600';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-red-300 text-center">Admin Order Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Order ID</th>
            <th className="p-2 border border-gray-300">User Name</th>
            <th className="p-2 border border-gray-300">Amount <span className='text-red-300'>(In ₹)</span></th>
            <th className="p-2 border border-gray-300">Time</th>
            <th className="p-2 border border-gray-300">Payment</th>
            <th className="p-2 border border-gray-300">Status</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="p-2 border border-gray-300">{order._id}</td>
              <td className="p-2 border border-gray-300">{user.username}</td>
              <td className="p-2 border border-gray-300">{order.total}</td>
              <td className="p-2 border border-gray-300">{order.timestamp}</td>
              <td className="p-2 border border-gray-300 text-green-500">{order.payment ? 'Paid' : 'Unpaid'}</td>
              <td className={`p-2 border border-gray-300 ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="p-2 border border-gray-300">
                <select
                  className="p-1 border border-gray-300 rounded"
                  value=""
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
