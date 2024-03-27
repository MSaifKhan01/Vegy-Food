import React from "react";
import { NavLink, Link } from "react-router-dom";
import { EMPTY_CART_IMG } from "../Config";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={EMPTY_CART_IMG} alt="" className="h-[200px] w-[200px] mb-4" />
      <h2 className="text-xl text-gray-700 font-bold mb-4">Your Cart is <span className="text-red-500">Empty!</span></h2>
      <p className="text-gray-600 mb-8">Must add items on the cart before you proceed to check out .</p>

      {/* <p className="text-gray-600 mb-2">Must add items to your cart before checking out.</p> */}
      <p className="text-gray-600 mb-6">Explore restaurants and discover delicious dishes.</p>
      <Link to="/">
        <button className="bg-red-400 text-white px-6 py-3 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out focus:outline-none">
          SEE RESTAURANTS NEAR YOU
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
