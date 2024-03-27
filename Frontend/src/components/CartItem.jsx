import React, { useState } from "react";

const CartItem = ({ name, description, price, imageId }) => {
  // State to track the quantity of the item
  const [quantity, setQuantity] = useState(1);

  // Function to handle incrementing the quantity
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decrementing the quantity
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to calculate the total price for the item
  const calculateTotalPrice = () => {
    return (price / 100) * quantity;
  };

  return (
    <div className="flex gap-4 border border-gray-200 rounded-md p-4 shadow-md">
      <div className="flex-1">
        <h3 className="font-bold text-xl text-green-400">{name}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-between">
        <div className="flex items-center mt-2">
          {/* Decrement button */}
          <button
            onClick={handleDecrement}
            className="bg-red-300 text-gray-600 px-3 py-1 rounded"
          >
            -
          </button>
          {/* Quantity display */}
          <p className="text-gray-800 mx-2">{quantity}</p>
          {/* Increment button */}
          <button
            onClick={handleIncrement}
            className="bg-red-300 text-gray-600 px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        <button className="bg-red-300 text-gray-600 px-2  rounded">Remove item</button>
        </div>
      
       
        {/* Price per item and total sections */}
        <div className="flex justify-between mt-4">
          <h4 className="font-semibold text-blue-600">
            Price Per Item: Rs {(price / 100).toFixed(2)}
          </h4>
          <h4 className="font-semibold text-blue-600">
            Total: Rs {calculateTotalPrice().toFixed(2)}
          </h4>
        </div>
      </div>
      {/* Image */}
      <div className="w-1/5 h-1/5">
        <img
          className="w-full h-full object-cover"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/" +
            imageId
          }
          alt="Image"
        />
      </div>
    </div>
  );
};

export default CartItem;
