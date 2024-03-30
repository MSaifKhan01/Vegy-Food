import { useState } from "react";

import instamart from "../Image/instamart.png"
import InstaCanva from "../Image/InstaCanva.png"



const Instamart = () => {
    // const [visibleSection,setVisibleSection]=useState("")
  return (
    <>
   

      <div className="container">
      <div className="flex flex-col justify-center items-center gap-10 p-5">
        <span className='text-blue-dark font-bold text-4xl'>Coming Soon ...</span>
        <img className="w-[300px]" alt="instamert" src= {InstaCanva} />
      </div>
    </div>

     
    </>
  );
};

export default Instamart;



