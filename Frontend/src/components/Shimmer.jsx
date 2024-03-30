
import React from 'react';

const CardShimmer = () => {
  return (
    <div className="w-64 h-96 p-6 mb-6 bg-gray-300 shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-400 mb-4"></div>
      <div className="w-3/5 h-4 bg-gray-400 mb-2"></div>
      <div className="w-4/5 h-4 bg-gray-400 mb-2"></div>
      <div className="w-full h-4 bg-gray-400"></div>
    </div>
  );
}

export const MenuShimmer = () => {
  return (
    <div className="container flex flex-col justify-center items-center animate-pulse mt-4">
      <div className="flex flex-wrap justify-center items-center p-8 bg-gray-300">
        <div className="w-64 h-96 bg-gray-400"></div>
        <div className="flex flex-col w-96 ml-5">
          <h2 className="w-40 h-6 bg-gray-400 mb-2"></h2>
          <p className="w-20 h-4 bg-gray-400 mb-2"></p>
          <div className="w-60 h-4 bg-gray-400"></div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mt-7 w-96">
          <div className="p-5">
            <h3 className="w-40 h-6 bg-gray-400 mb-2"></h3>
            <p className="w-20 h-4 bg-gray-400"></p>
          </div>
          <div className="flex flex-col justify-evenly">
            { Array.from({length:25}).map( (element, index)  => 
              <div className="w-full h-40 p-6 mb-6 bg-gray-300 shadow-lg animate-pulse" key={index}>
                <div className="w-96 h-6 bg-gray-400 mb-2"></div>
                <p className="w-20 h-4 bg-gray-400 mb-2"></p>
                <div className="w-60 h-4 bg-gray-400"></div>
              </div>
            )}
          </div>
        </div>
        <div className="cart-widget"></div>
      </div>
    </div>
  )
}

const Shimmer = () => { 
  return (
    <div className="flex flex-wrap gap-5 justify-center mt-4">
      {Array.from({length:25}).map((element, index) => {
        return <CardShimmer key={index} />
      }) }
    </div>   
  )
}

export default Shimmer;
