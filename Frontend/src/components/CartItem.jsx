import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { DecreaseItemsQty, DeleteItem, GetCartItems, IncreaseItemsQty } from "../utills/cartSlice";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItem = ({ Item, Quantity }) => {

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();



  const handleIncrement = (id) => {
    // console.log("inc", id);
    dispatch(IncreaseItemsQty(id));
  };

 
  const handleDecrement = (id) => {
    if (Quantity > 1) {
      dispatch(DecreaseItemsQty(id));
    
    }
  };

  const handleDeleteItem= async(id)=>{
    let action=await dispatch(DeleteItem(id))
    // console.log(action)
    if(action.meta.requestStatus==="fulfilled" && action.payload.result.msg==="Product Removed Successfully"){
      toast.success( action.payload.result.msg);
    }else{
      toast.error( action.payload.result.msg);
    }
  }


  const calculateTotalPrice = () => {
    return (Item.Product
      .price / 100) * Quantity;
  };

  return (
 <>
 {Item.Product &&
     <div className="flex gap-4 border border-gray-200 rounded-md p-4 shadow-md">
     <div className="flex-1">
       <h3 className="font-bold text-xl text-green-400">{Item.Product.name}</h3>
       <p className="text-gray-600">{Item.Product.description}</p>
       <div className="flex justify-between">
         <div className="flex items-center mt-2">
           {/* Decrement button */}
           <button
             onClick={() => handleDecrement(Item.Product
               .id)}
             className="bg-red-300 text-gray-600 px-3 py-1 rounded"
           >
             -
           </button>

      
           <p className="text-gray-800 mx-2">{Quantity}</p>
      
           <button
             onClick={() => handleIncrement(Item.Product
               .id)}
             className="bg-red-300 text-gray-600 px-3 py-1 rounded"
           >
             +
           </button>
         </div>

         <button onClick={(()=>handleDeleteItem(Item.Product
.id))} className="bg-red-300 text-gray-600 px-2  rounded">
           Remove item
         </button>
       </div>

       {/* Price per item and total sections */}
       <div className="flex justify-between mt-4">
         <h4 className="font-semibold text-blue-600">
           Price Per Item: Rs {(Item.Product
.price / 100).toFixed(2)}
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
           Item.Product
           .imageId
         }
         alt="Image"
       />
     </div>
   </div>
 }
 </>
  );
};

export default CartItem;



