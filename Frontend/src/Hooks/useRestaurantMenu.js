import { useState, useEffect } from "react";
import { Base_URL, RestaurenInfo_Menu_URL } from "../Config";

const useRestaurantMenu = (id) => {
  const [restaurent, setRestaurent] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [allItemCardsItem, setAllItemCardsItem] = useState([]);
  // console.log("from helper data ", menuData);

  const getRestaurentData = async () => {
    try {


        // const response = await fetch(`https://vegy-food.onrender.com/restaurants?restaurantId=${id}`);
        const response = await fetch(`${Base_URL}/restaurants?restaurantId=${id}`);

 
      const data = await response.json();
      // console.log("res from helper", response);

      const menuTargatedData =
        data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      // console.log("from helper 2------", menuTargatedData);
      setMenuData(menuTargatedData);

      const allItemCards = [];
      menuTargatedData.forEach((item) => {
        if (item?.card?.card?.itemCards) {
          allItemCards.push(...item.card.card.itemCards);
        }
      });

      let AllMenuData = await setAllItemCardsItem(allItemCards);

      const targetedData = data?.data?.cards[0]?.card?.card?.info;
      setRestaurent(targetedData);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  useEffect(() => {
    getRestaurentData();
  }, [id]); // Trigger effect when 'id' changes
  // console.log("from use Hook  ", allItemCardsItem);

  return { restaurent, menuData, allItemCardsItem };
};

export default useRestaurantMenu;
