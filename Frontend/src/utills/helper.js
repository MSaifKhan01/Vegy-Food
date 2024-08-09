

export const getFilterData = async (Data, searchText, sortOption) => {
  // console.log("from Helper",sortOption)
  let filterdata = Data.filter((ele) => {
    if (ele.info && ele.info.name) {
      return ele.info.name.toLowerCase().includes(searchText.toLowerCase());
    }
    if (ele.card && ele.card.info && ele.card.info.name) {
      return ele.card.info.name.toLowerCase().includes(searchText.toLowerCase());
    }
    return false;
  });
  
  // Apply sorting if a sort option is provided
  if (sortOption === 'name_ascR') {
    return filterdata.sort((a, b) => a.info.name.toLowerCase().localeCompare(b.info.name.toLowerCase()));
  } 
  else if (sortOption === 'name_asc') {
    return filterdata.sort((a, b) => a.card.info.name.toLowerCase().localeCompare(b.card.info.name.toLowerCase()));
  } 
  else if (sortOption === 'name_descR') {
    return filterdata.sort((a, b) => b.info.name.toLowerCase().localeCompare(a.info.name.toLowerCase()));
  }


  else if (sortOption === 'name_desc') {
    return filterdata.sort((a, b) => b.card.info.name.toLowerCase().localeCompare(a.card.info.name.toLowerCase()));
  } 

  else if (sortOption === 'Loca_ascR') {
    return filterdata.sort((a, b) => a.info.sla.lastMileTravel - b.info.sla.lastMileTravel);
  }
  
  else if (sortOption === 'price_asc') {
    return filterdata.sort((a, b) => a.card.info.price - b.card.info.price);
  } 
  else if (sortOption === 'Loca_descR') {
    return filterdata.sort((a, b) => b.info.sla.lastMileTravel - a.info.sla.lastMileTravel);
  } 
  
  else if (sortOption === 'price_desc') {
    return filterdata.sort((a, b) => b.card.info.price - a.card.info.price);
  } 

  else if (sortOption === 'rating_ascR') {
    return filterdata.sort((a, b) => a.info.avgRating
       - b.info.avgRating
        );
  } 
  
  else if (sortOption === 'rating_asc') {
    return filterdata.sort((a, b) => parseFloat(a.card.info.ratings.aggregatedRating.rating) - parseFloat(b.card.info.ratings.aggregatedRating.rating));
  } 

  else if (sortOption === 'rating_descR') {
    return filterdata.sort((a, b) => b.info.avgRating
      - a.info.avgRating
        );
  }
  
  else if (sortOption === 'rating_desc') {
    return filterdata.sort((a, b) => parseFloat(b.card.info.ratings.aggregatedRating.rating) - parseFloat(a.card.info.ratings.aggregatedRating.rating));
  }

  return filterdata;
};
