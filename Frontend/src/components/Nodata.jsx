import React from 'react';

const NoDataMessage = ({ searchText }) => {
  return (
    <div className="relative bg-gray-100 h-screen flex items-center justify-center">
      {/* Text container */}
      <div className="absolute top-0 left-0 right-0 text-center z-10">
        <h3 className="text-red-400 text-2xl font-bold mb-2">
          No Data Available for <span className="text-red-700">{searchText}</span>
        </h3>
        <p className="text-blue-700 text-2xl p-4">
          We apologize, but it seems that there is no data available matching your <span className="text-red-900">{searchText}</span> search criteria. Please try again with different keywords or filters.
        </p>
      </div>
      
      {/* Image container */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1710699395~exp=1710702995~hmac=447cd59e471df23823ec796eeeb8081af40057c711c040835cae31b4e95d5126&w=740" alt="No Data Image" className="w-7/8 h-full object-cover rounded-lg m-auto" />
      </div>
    </div>
  );
}

export default NoDataMessage;
