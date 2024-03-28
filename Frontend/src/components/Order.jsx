import React, { useState } from 'react';

const Order = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [address, setAddress] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="max-w-4/5 mx-auto bg-white shadow-md overflow-hidden rounded-lg">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Details</h2>
        <div className='flex flex-wrap'>
          <div className="w-full md:w-1/2 mb-8">
            <h1>Total : 898</h1>
            <p className="text-lg font-semibold mb-2 text-gray-700">Cart Items:</p>
            <ul className="list-disc ml-4">
              <li className="mb-2 text-gray-700"><strong>Product Name:</strong> Burger</li>
              <li className="mb-2 text-gray-700"><strong>Quantity:</strong> 2</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mb-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Payment Details:</h3>
            <div className='mb-4'>
              <input 
                type="text" 
                placeholder='Enter your Email'
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                className="form-input w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className='mb-4'>
              <input 
                type="text" 
                placeholder='Enter your card number'
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="form-input w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className='mb-4'>
              <input 
                type="text" 
                placeholder='Enter Card Holder Name'
                value={cardNumber} 
                onChange={handleCardNumberChange} 
                className="form-input w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className='mb-4'>
              <textarea
                placeholder='Enter your address'
                value={address}
                onChange={handleAddressChange}
                className="form-textarea w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className='mb-4 flex'>
              <input 
                type="text" 
                placeholder='Enter expiry date (MM/YYYY)'
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="form-input w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <input 
                type="text" 
                placeholder='Enter cvv'
                value={expiryDate} 
                onChange={handleExpiryDateChange} 
                className="form-input w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Make Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
