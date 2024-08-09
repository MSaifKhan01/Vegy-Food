
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
        // console.log("iu")
        event.preventDefault();
        // console.log(isFavourite)
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
