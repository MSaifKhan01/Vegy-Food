

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SWIGGY_IMAGE_CDN_id } from "../Config";
import { MenuShimmer } from "./Shimmer";
import useRestaurantMenu from "../Hooks/useRestaurantMenu";
import { useDispatch } from "react-redux";
import { AddToCartItem } from "../utills/cartSlice";
import { getFilterData } from "../utills/helper";
import NoDataMessage from "./Nodata.jsx";
import { Star, } from 'lucide-react';

import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";

const ITEMS_PER_PAGE = 8;

const RestaurentMenu = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const RestauroInfoAndMenu = useRestaurantMenu(id);
  const restaurent = RestauroInfoAndMenu.restaurent;
  // console.log("-------resto", restaurent);
  const menuData = RestauroInfoAndMenu.menuData;
  console.log("hvhvh", RestauroInfoAndMenu);
  const allItemCardsItem = RestauroInfoAndMenu.allItemCardsItem;

  let isOnline = useOnline();

  useEffect(() => {
    setFilteredItems(allItemCardsItem);
  }, [allItemCardsItem]);

  const handleAddItem = (item) => {
    // dispatch(addItem(item));

    dispatch(AddToCartItem(item))
    console.log("from cart for checking Id:",item)
  };

  const handleClearCart = () => {
    // dispatch(clearCart());
  };
  console.log("simple from", sortOption);

  if (!isOnline) {
    return <UserOffline />;
  }

  const buttonStyle = {
    backgroundColor:
      restaurent.avgRating === "--"
        ? "#fff"
        : parseFloat(restaurent.avgRating) < 4.0
        ? "#db7c38"
        : "#48c479",
    color: isNaN(restaurent.avgRating) ? "#535665" : "#fff",
  };

  const handleSearch = async (sortOption) => {
    const filteredData = await getFilterData(
      allItemCardsItem,
      searchText,
      sortOption
    );
    console.log("from handle search ", sortOption);
    setFilteredItems(filteredData);
    setCurrentPage(1); // Reset to first page after search
  };

  // const handleSortChange = (e) => {
  //   setSortOption(e.target.value);
  //   handleSearch()
  // };

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  // Render items for current page
  const renderItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex).map((itemcard, j) => (
      <li
        className="flex flex-col md:flex-row items-center justify-between border-b border-gray-600 pb-2"
        key={j}
      >
        <div className="w-4/5">
          <h3 className="text-lg font-semibold">
            {itemcard?.card?.info?.name}
          </h3>

          <p className="mt-1 text-sm">{itemcard?.card?.info?.description}</p>
          <h5 className="mt-1">Price ₹ {itemcard?.card?.info?.price / 100}</h5>
          <div
  className="flex items-center h-5 w-10 gap-1 py-0 px-1 rounded-md mt-2"
  style={{
    backgroundColor:
      restaurent.avgRating === "--" ||
      parseFloat(
        itemcard?.card?.info?.ratings.aggregatedRating.rating || 0
      ) === 0
        ? "#ffed4a" // Yellow color for unrated or zero rating
        : parseFloat(
            itemcard?.card?.info?.ratings.aggregatedRating.rating || 0
          ) < 4.0
        ? "#db7c38" // Red color for ratings less than 4.0
        : "#48c479", // Green color for ratings greater than or equal to 4.0
    color:
      restaurent.avgRating === "--" ||
      parseFloat(
        itemcard?.card?.info?.ratings.aggregatedRating.rating || 0
      ) === 0
        ? "#000" // Black color for unrated or zero rating
        : isNaN(
            itemcard?.card?.info?.ratings.aggregatedRating.rating
          )
        ? "#535665" // Default color for invalid rating values
        : "#fff", // White color for valid ratings
  }}
>
  <span>
    {" "}
    {itemcard?.card?.info?.ratings.aggregatedRating.rating || 0}{" "}
  </span>
  <span className="ml-6 rounded-lg">
    <Star className="rounded-md"
      style={{ 
        backgroundColor:
          restaurent.avgRating === "--" ||
          parseFloat(
            itemcard?.card?.info?.ratings.aggregatedRating.rating || 0
          ) === 0
            ? "#ffed4a" // Yellow color for unrated or zero rating
            : parseFloat(
                itemcard?.card?.info?.ratings.aggregatedRating.rating || 0
              ) < 4.0
            ? "#db7c38" // Red color for ratings less than 4.0
            : "#48c479", // Green color for ratings greater than or equal to 4.0
        color:
          restaurent.avgRating === "--" ||
          parseFloat(
            itemcard?.card?.info?.ratings.aggregatedRating.rating || 0
          ) === 0
            ? "#000" // Black color for unrated or zero rating
            : isNaN(
                itemcard?.card?.info?.ratings.aggregatedRating.rating
              )
            ? "#535665" // Default color for invalid rating values
            : "#fff", // White color for valid ratings
      }}
    />
  </span>
</div>





          
        </div>
        <div className="w-full md:w-48 h-40 flex justify-center md:justify-start">
          {itemcard?.card?.info?.imageId ? (
            <div className="mt-2">
              <h1
                className={`${
                  itemcard?.card?.info?.itemAttribute?.vegClassifier === "VEG"
                    ? "text-white bg-green-500 rounded-e-lg w-1/3"
                    : " text-white bg-red-500 rounded-e-lg w-3/5"
                } `}
              >
                {itemcard?.card?.info?.itemAttribute?.vegClassifier}
              </h1>

              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/" +
                  itemcard?.card?.info?.imageId
                }
                alt="item"
                className="w-30 h-28 object-cover rounded"
              />
              <div className="-mt-4 ml-8">
                <button
                  onClick={() => handleAddItem(itemcard?.card?.info)}
                  className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-green-400 shadow-lg"
                >
                  Add +
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2 w-1/5">
              <img
                src="https://wallpapercave.com/wp/wp6532293.jpg"
                alt="image"
                className="w-30 h-28 object-cover rounded ml-2"
              />
              <div className="-mt-4 ml-1 ">
                <button
                  onClick={() => handleAddItem(itemcard?.card?.info)}
                  className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-green-400 shadow-lg"
                >
                  Add +
                </button>
              </div>
            </div>
          )}
        </div>
      </li>
    ));
  };

  // Pagination buttons
  const paginationButtons = [];
  for (let i = 0; i < totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`mx-1 px-4 py-2 rounded-md ${
          currentPage === i + 1
            ? "bg-red-300 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {i + 1}
      </button>
    );
  }

  // if(filteredItems.length===0){
  //   return (<NoDataMessage />)
  // }

  return menuData.length === 0 ? (
    <MenuShimmer />
  ) : filteredItems.length===0 ?(<div>
    <div className="flex items-center justify-evenly mt-4 gap bg-slate-300 rounded-lg">
      <div className="flex">
        <input
          className="border border-gray-400 rounded-l px-2 py-1 w-24 md:w-32 lg:w-48"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-container flex items-center justify-center bg-red-300 rounded-r h-8 p-3 w-16 md:w-20 lg:w-24"
          onClick={handleSearch}
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
          onChange={(e) => {
            const selectedSortOption = e.target.value;
            setSortOption(selectedSortOption);
            handleSearch(selectedSortOption);
          }}
          className="border border-gray-300 rounded px-2 py-1 mt-2 focus:outline-none focus:border-red-200 mb-2 w-full"
        >
          <option value="">Select</option>
          <option value="name_asc">Name (A to Z)</option>
          <option value="name_desc">Name (Z to A)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="rating_asc">Rating (Low to High)</option>
          <option value="rating_desc">Rating (High to Low)</option>
        </select>
      </div>
    </div>

    <div className="flex justify-center mt-4"> {/* Center horizontally */}
      <div className="bg-gray-100 rounded-lg p-4 w-1/4">
        <h1 className="text-2xl font-bold mb-4">
          Menu Items{" "}
          <span className="text-gray-500 bg-red-200 rounded-full px-2">{filteredItems.length}</span>
        </h1>
      </div>
    </div>

    <NoDataMessage searchText={searchText}/>
  </div>):(
    <div className="bg-white text-black p-8">
      <div className="flex flex-col md:flex-row justify-start gap-14 p-14 bg-black text-white rounded-lg">
        <div>
          <img
            src={SWIGGY_IMAGE_CDN_id + restaurent.cloudinaryImageId}
            alt="image"
            className="w-full md:w-64 rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold">{restaurent.name}</h3>
          <h4 className="text-lg mt-2">
            Cuisines : {restaurent?.cuisines?.slice(0, 3).join(", ")}
          </h4>
          <h4 className="text-lg">
            Address : {restaurent.areaName}, {restaurent.city}
          </h4>
          <div className="flex items-center mt-4">
            <h4 className="mr-4">Cost for Two Rs. {restaurent.costForTwo}</h4>
            <h4 className="mr-4 text-lg font-semibold text-green-200">
              Offers {restaurent.aggregatedDiscountInfo.header}
            </h4>

            <div
              className="flex items-center h-5 w-10 gap-1 py-0 px-1 rounded-md"
              style={buttonStyle}
            >
              <span>{restaurent.avgRating}</span>
            </div>
            <span className="ml-1 mr-4"><Star /></span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-evenly mt-4 gap bg-slate-300 rounded-lg">
        <div className="flex">
          <input
            className="border border-gray-400 rounded-l px-2 py-1 w-24 md:w-32 lg:w-48"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="search-container flex items-center justify-center bg-red-300 rounded-r h-8 p-3 w-16 md:w-20 lg:w-24"
            onClick={handleSearch}
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
            onChange={(e) => {
              const selectedSortOption = e.target.value;
              setSortOption(selectedSortOption);
              handleSearch(selectedSortOption);
            }}
            className="border border-gray-300 rounded px-2 py-1 mt-2 focus:outline-none focus:border-red-200 mb-2 w-full"
          >
            <option value="">Select</option>
            <option value="name_asc">Name (A to Z)</option>
            <option value="name_desc">Name (Z to A)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="rating_asc">Rating (Low to High)</option>
            <option value="rating_desc">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-4"> {/* Center horizontally */}
  <div className="bg-gray-100 rounded-lg p-4 w-1/4">
    <h1 className="text-2xl font-bold mb-4">
      Menu Items{" "}
      <span className="text-gray-500 bg-red-200 rounded-full px-2">{filteredItems.length}</span>

    </h1>
  </div>
</div>


      {/* Items rendering */}
      <ul className="mt-4">{renderItems()}</ul>

      {/* Pagination implementing */}
      <div className="flex justify-center mt-4 flex-wrap">
        {paginationButtons}
      </div>
    </div>
  );
};

export default RestaurentMenu;
