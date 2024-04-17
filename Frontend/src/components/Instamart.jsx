import { useState } from "react";


import InstamartCanva from "../Image/InstamartCanva.png"
import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";


const Instamart = () => {
   

    let isOnline = useOnline();
    if (!isOnline) {
      return <UserOffline />;
    }
  return (
    <>
   

      <div className="container">
      <div className="flex flex-col justify-center items-center gap-10 p-5">
        <span className='text-blue-dark font-bold text-4xl'>Coming Soon ...</span>
        <img className="w-[500px]" alt="instamert" src= {InstamartCanva} />
      </div>
    </div>

     
    </>
  );
};

export default Instamart;



