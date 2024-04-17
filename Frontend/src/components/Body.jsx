import { useContext, useEffect, useState } from "react";

import ItemCard from "./ItemCard.jsx";

import { Link } from "react-router-dom";

import { getFilterData } from "../utills/helper.js";
import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";
import UserContext from "../utills/UserContext.js";
import Shimmer from "./Shimmer.jsx";
import NoDataMessage from "./Nodata.jsx";


// Banner Images 
import Bannerimg01 from "../Image/Bannerimg01.jpg"
import Banner02Img from "../Image/Banner02Img.png"

import Banner04Img from "../Image/Banner04Img.png"
import Banner05Img from "../Image/Banner05Img.png"
import Banner06Img from "../Image/Banner06Img.png"
import { Base_URL } from "../Config.js";
import OtpForPassword from "./OtpForPassword.jsx";




const Body = () => {
  const [serachTxt, setSerachTxt] = useState("");
  const [Data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);


  let isOnline = useOnline();

  // const {user,setUser}=useContext(UserContext)

  const getData = async () => {
    // const Data2 = await fetch(
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );

    // const Data2 = await fetch("https://vegy-food.onrender.com/restaurants");
    const Data2 = await fetch(`${Base_URL}/restaurants`);

    let ReadyData = await Data2.json();
    // console.log(ReadyData)

    let DataOfArr =
      ReadyData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    // console.log("from body component", DataOfArr);
    const filteredData = await getFilterData(DataOfArr, serachTxt, sortOption);

    setData(filteredData);
    setFilterData(filteredData);
  };

  // console.log("folterDta",filterData)

  const images = [
    Banner04Img,
    Banner02Img,
    Banner05Img,

    Banner06Img,
    Bannerimg01
   
  ];

  useEffect(() => {
    getData();
    const intervalId = setInterval(() => {
      setCurrentBannerIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
    
  }, [images.length]);

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const userDataParam = urlParams.get("userData");

    if (userDataParam !== null) {
      try {
        const userDataObj = JSON.parse(decodeURIComponent(userDataParam));
        sessionStorage.setItem("token", userDataObj.token);
        sessionStorage.setItem("User", JSON.stringify(userDataObj.existingUser));
      } catch (error) {
        setError("Error parsing user data");
      }
    }
    
  })


  if (!isOnline) {
    return <UserOffline />;
  }
  return Data.length === 0 ? (
    <Shimmer />
  ) : (
    <>
     <div className="w-full flex justify-center mt-4">
        <img
          src={images[currentBannerIndex]}
          alt="Banner"
          className="w-full max-w-screen-lg h-auto sm:h-[200px] rounded-md"
        />
      </div>
      <OtpForPassword />
    
    <div className="m-10">
      <div className="flex items-center justify-evenly mt-4 gap bg-slate-300 rounded-lg">
        <div className="flex">
          <input
            className="border border-gray-400 rounded-l px-2 py-1 w-24 md:w-32 lg:w-48"
            type="text"
            placeholder="Search"
            value={serachTxt}
            onChange={(e) => setSerachTxt(e.target.value)}
          />
          <button
            className="search-container flex items-center justify-center bg-red-300 rounded-r h-8 p-3 w-16 md:w-20 lg:w-24"
            onClick={async () => {
              let data = await getFilterData(Data, serachTxt, sortOption);
              setFilterData(data);
            }}
            
          >
            Search
          </button>
        </div>

        <div className="flex items-center mt-2 mb-2 bg-gray-300 md:w-1/3 lg:w-1/4 xl:w-1/5 h-auto rounded-lg">
          <label htmlFor="sort" className="mr-2 text-black font-bold">
            Sort By:
          </label>
          <select
            id="sort"
            name="sort"
            value={sortOption}
            onChange={async (e) => {
              const selectedSortOption = e.target.value;
              setSortOption(selectedSortOption);
              let data = await getFilterData(
                Data,
                serachTxt,
                selectedSortOption
              );
              setFilterData(data);
            }}
            className="border border-gray-300 rounded px-2 py-1 mt-2 focus:outline-none focus:border-red-200 mb-2 w-full"
          >
            <option value="">Select</option>
            <option value="name_ascR">Name (A to Z)</option>
            <option value="name_descR">Name (Z to A)</option>
            <option value="Loca_ascR">Distance (Low to High)</option>
            <option value="Locat_descR">Distance (High to Low)</option>
            <option value="rating_ascR">Rating (Low to High)</option>
            <option value="rating_descR">Rating (High to Low)</option>
          </select>
        </div>
      </div>

     
      {filterData.length === 0 ? (
        <NoDataMessage searchText={serachTxt} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {filterData.map((ele, index) => {
            return (
              <Link to={`/restaurant/${ele?.info?.id}`}>
                <ItemCard itemEle={ele} key={index + 1} />{" "}
              </Link>
            );
          })}
        </div>
      )}
    </div>
    </>
    
  );
};

export default Body;
