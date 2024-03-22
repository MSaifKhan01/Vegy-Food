// import { SWIGGY_IMAGE_CDN_id } from "../Config";

// // import { AiFillStar } from "react-icons/ai";

// const ItemCard = ({ itemEle }) => {


//     const {name, cuisines, cloudinaryImageId, avgRating, slaString, costForTwoString} = itemEle;
//   const buttonStyle = {
//     backgroundColor: avgRating == "--" ? "#fff" : parseFloat(avgRating) < 4.0 ? "#db7c38":"#48c479",
//     color : isNaN(avgRating)? "#535665" : "#fff"
//   }
//   const [isFavourite, setIsFavourite] = useState(false);

//   const markFavourite = (event) => {
//     setRestaurants(props);
//     setIsFavourite(!isFavourite);
//     event.preventDefault();
//   }

//   return (
//     <div className="basis-[250px] mob:basis-[150px] p-2.5 mb-2.5 hover:shadow">
//       <div className="relative w-full ">
//         <div className="absolute z-[2] text-gray-light text-[25px] text-right cursor-pointer rounded-[10rem] w-[99%] ">
//           <span className={isFavourite? "text-red" : ""} 
//           onClick={(e) => {markFavourite(e)}} >&#x2764;</span>
//         </div>
//         <img className="w-full mob:w-[130px]" src={ SWIGGY_IMAGE_CDN_id  + cloudinaryImageId } alt={name}/>      
//       </div>
//       <div className="">
//         <h6 className="text-base font-bold w-3/5 tracking-normal">{name}</h6>
//         <p className="text-gray-dark text-xs w-4/5 overflow-hidden h-[32px]">{cuisines.join(", ")}</p>
//         <div className="flex mt-4 justify-between items-center text-xs pb-2.5 text-gray-details font-semibold mob:flex-col mob:items-start">
//           <div className="flex items-center h-5 w-11 gap-1 py-0 px-1" style={buttonStyle}>
//             {/* <AiFillStar /> */}
//             <span>{avgRating}</span>
//           </div>
//           <div>•</div>
//           <div>{slaString}</div>
//           <div>•</div>
//           <div>{costForTwoString}</div>
//         </div>
//       </div>
//     </div>

//   );
//     // const { name, sla: { deliveryTime }, costForTwo, cuisines, cloudinaryImageId, avgRating } = itemEle.info;

//     // return (
//     //     <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
//     //         <img className="w-full h-40 object-cover" src={SWIGGY_IMAGE_CDN_id + cloudinaryImageId} alt="image" />
//     //         <div className="p-4 flex flex-col justify-between flex-grow">
//     //             <div>
//     //                 <h2 className="text-xl font-semibold">{name}</h2>
//     //                 <h3 className="text-gray-600 mb-2">{cuisines.slice(0, 3).join(", ")}</h3>
//     //                 <p className="text-gray-700 mb-2">Delivery Time: {deliveryTime} min</p>
//     //                 <div className="flex items-center">
//     //                     {
//     //                         (avgRating > 4) ? (
//     //                             <div className="flex items-center">
//     //                                 <h4 className="text-green-500 font-semibold mr-1">{avgRating}</h4>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
//     //                                     <path fillRule="evenodd" d="M10 0a1 1 0 0 1 .973 1.234l-1.6 6.4H17a1 1 0 0 1 .768 1.64l-4.9 4.9 1.6 6.4a1 1 0 0 1-1.543 1.111L10 16.314l-5.225 3.845a1 1 0 0 1-1.543-1.111l1.6-6.4-4.9-4.9a1 1 0 0 1 .768-1.64h6.627l-1.6-6.4A1 1 0 0 1 10 0Z" />
//     //                                 </svg>
//     //                             </div>
//     //                         ) : (
//     //                             <div className="flex items-center">
//     //                                 <h4 className="text-yellow-500 font-semibold mr-1">{avgRating}</h4>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
//     //                                     <path fillRule="evenodd" d="M10 0a1 1 0 0 1 .973 1.234l-1.6 6.4H17a1 1 0 0 1 .768 1.64l-4.9 4.9 1.6 6.4a1 1 0 0 1-1.543 1.111L10 16.314l-5.225 3.845a1 1 0 0 1-1.543-1.111l1.6-6.4-4.9-4.9a1 1 0 0 1 .768-1.64h6.627l-1.6-6.4A1 1 0 0 1 10 0Z" />
//     //                                 </svg>
//     //                             </div>
//     //                         )
//     //                     }
//     //                 </div>
//     //             </div>
//     //             <div className="mt-auto">
//     //                 <h4 className="text-gray-800 font-semibold mt-4">Cost : {costForTwo}</h4>
//     //             </div>
//     //         </div>
//     //     </div>
//     // );
// };

// export default ItemCard;


// // import {RES_IMG_CDN } from "../config";
// // import { AiFillStar } from "react-icons/ai";
// // import { useState } from "react";

// // export const RestaurantCard = ({ props, setRestaurants}) => {
// //   const {name, cuisines, cloudinaryImageId, avgRating, slaString, costForTwoString} = props;
// //   const buttonStyle = {
// //     backgroundColor: avgRating == "--" ? "#fff" : parseFloat(avgRating) < 4.0 ? "#db7c38":"#48c479",
// //     color : isNaN(avgRating)? "#535665" : "#fff"
// //   }
// //   const [isFavourite, setIsFavourite] = useState(false);

// //   const markFavourite = (event) => {
// //     setRestaurants(props);
// //     setIsFavourite(!isFavourite);
// //     event.preventDefault();
// //   }

// //   return (
// //     <div className="basis-[250px] mob:basis-[150px] p-2.5 mb-2.5 hover:shadow">
// //       <div className="relative w-full ">
// //         <div className="absolute z-[2] text-gray-light text-[25px] text-right cursor-pointer rounded-[10rem] w-[99%] ">
// //           <span className={isFavourite? "text-red" : ""} 
// //           onClick={(e) => {markFavourite(e)}} >&#x2764;</span>
// //         </div>
// //         <img className="w-full mob:w-[130px]" src={ SWIGGY_IMAGE_CDN_id  + cloudinaryImageId } alt={name}/>      
// //       </div>
// //       <div className="">
// //         <h6 className="text-base font-bold w-3/5 tracking-normal">{name}</h6>
// //         <p className="text-gray-dark text-xs w-4/5 overflow-hidden h-[32px]">{cuisines.join(", ")}</p>
// //         <div className="flex mt-4 justify-between items-center text-xs pb-2.5 text-gray-details font-semibold mob:flex-col mob:items-start">
// //           <div className="flex items-center h-5 w-11 gap-1 py-0 px-1" style={buttonStyle}>
// //             <AiFillStar /><span>{avgRating}</span>
// //           </div>
// //           <div>•</div>
// //           <div>{slaString}</div>
// //           <div>•</div>
// //           <div>{costForTwoString}</div>
// //         </div>
// //       </div>
// //     </div>

// //   );
// // };
import { useState } from "react";
import { SWIGGY_IMAGE_CDN_id } from "../Config";
import { Crown  } from 'lucide-react';

const ItemCard = ({ itemEle }) => {
    const { name, sla: { lastMileTravelString }, costForTwo, cuisines, cloudinaryImageId, avgRating, slaString, locality } = itemEle.info;

    const buttonStyle = {
        backgroundColor: avgRating === "--" ? "#fff" : parseFloat(avgRating) < 4.0 ? "#db7c38" : "#48c479",
        color: isNaN(avgRating) ? "#535665" : "#fff"
    };

    const [isFavourite, setIsFavourite] = useState(false);

    const markFavourite = (event) => {
        console.log("iu")
        event.preventDefault();
        console.log(isFavourite)
        setIsFavourite(!isFavourite);
       
    };

    return (
        <div className="basis-[250px] mob:basis-[150px] p-2.5 mb-2.5 hover:shadow flex flex-col h-full">
            <div className="relative flex-1">
            <div className="absolute z-[2] text-gray-light text-[25px] text-right cursor-pointer rounded-[10rem] w-[99%]">
    <p className={isFavourite ? "text-green-800 bg-green-800  w-1/6 rounded-lg" : "text-red-800 bg-red-800 w-1/6 rounded-lg"}>
    <span  onClick={(e) => markFavourite(e)}><Crown className="text-black ml-1" /></span>
    </p>
</div>

                <img className="w-full h-48 object-cover rounded-lg" src={SWIGGY_IMAGE_CDN_id + cloudinaryImageId} alt={name} />
            </div>
            <div className="mt-1 p-4 bg-white rounded-lg shadow-md">
                <h6 className="text-base font-bold w-3/5 tracking-normal">{name}</h6>
                <p className="text-gray-dark text-xs w-4/5 overflow-hidden h-[32px]">{cuisines.join(", ")}</p>
                <p className="text-db7c38 text-xs mt-1">Location - {locality}</p> 
                <div className="flex mt-2 items-center text-xs pb-2.5 text-gray-details font-semibold mob:flex-col mob:items-start">
                    <div className="flex items-center h-5 w-10 gap-1 py-0 px-1 rounded-md" style={buttonStyle}>
                        <span>{avgRating}</span>
                    </div>
                    <div className="text-[#db7c38] ml-3">• {lastMileTravelString}</div>
    <div className="text-[#db7c38] ml-3">{slaString}</div>
    <div className="text-[#db7c38] ml-3">• {costForTwo}</div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
