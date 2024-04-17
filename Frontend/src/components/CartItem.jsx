import React, { useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { DecreaseItemsQty, DeleteItem, GetCartItems, IncreaseItemsQty } from "../utills/cartSlice";

const CartItem = ({ Item, Quantity }) => {
  console.log("from cart item ", Item, Quantity);
  console.log("Item:", Item);
console.log("Product:", Item.Product);

  // const { name, description, price, imageId, id } = product;
  // console.log("-----",product)
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

  const handleDeleteItem=(id)=>{
    dispatch(DeleteItem(id))
  }


  const calculateTotalPrice = () => {
    return (Item.Product
      .price / 100) * Quantity;
  };

  return (
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
  );
};

export default CartItem;





// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { DecreaseItemsQty, DeleteItem, IncreaseItemsQty } from "../utills/cartSlice";

// const CartItem = () => {
//   const cartItems = useSelector((store) => store.cart.items);
//   const dispatch = useDispatch();

//   const handleIncrement = (id) => {
//     dispatch(IncreaseItemsQty(id));
//   };

//   const handleDecrement = (id) => {
//     dispatch(DecreaseItemsQty(id));
//   };

//   const handleDeleteItem = (id) => {
//     dispatch(DeleteItem(id));
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((acc, curr) => acc + (curr.Product.price / 100) * curr.Quantity, 0);
//   };

//   return (
//     <div className="flex gap-4 border border-gray-200 rounded-md p-4 shadow-md">
//       {cartItems.map((product, index) => (
//         <div className="" key={product.Product.id}>
//           <h3 className="font-bold text-xl text-green-400">{product.Product.name}</h3>
//           <p className="text-gray-600">{product.Product.description}</p>
//           <div className="flex justify-between">
//             <div className="flex items-center mt-2">
//               <button
//                 onClick={() => handleDecrement(product.Product.id)}
//                 className="bg-red-300 text-gray-600 px-3 py-1 rounded"
//               >
//                 -
//               </button>
//               <p className="text-gray-800 mx-2">{product.Quantity}</p>
//               <button
//                 onClick={() => handleIncrement(product.Product.id)}
//                 className="bg-red-300 text-gray-600 px-3 py-1 rounded"
//               >
//                 +
//               </button>
//             </div>
//             <button onClick={() => handleDeleteItem(product.Product.id)} className="bg-red-300 text-gray-600 px-2 rounded">
//               Remove item
//             </button>
//           </div>
//           <div className="flex justify-between mt-4">
//             <h4 className="font-semibold text-blue-600">
//               Price Per Item: Rs {(product.Product.price / 100).toFixed(2)}
//             </h4>
//             <h4 className="font-semibold text-blue-600">
//               Total: Rs {(product.Product.price / 100 * product.Quantity).toFixed(2)}
//             </h4>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartItem;




