const CartItem = ({ name, description, price, imageId }) => {
  console.log("price type : ", typeof price)
    return (
      <div className="flex gap-4 border border-gray-200 rounded-md p-4 shadow-md">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-green-400">{name}</h3>
          <p className="text-gray-600">{description}</p>
          <h4 className="font-semibold text-gray-800">Price: {price/100}</h4>
        </div>
        <div className="w-1/5 h-1/5">
          <img className="w-full h-full object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/" + imageId} alt="Image" />
        </div>
      </div>
    );
  };
  
  export default CartItem;
  