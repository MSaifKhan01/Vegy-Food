// import React from 'react';

// const Shimmer = () => {
//   return (
//     <div className="flex flex-wrap justify-between gap-2">
//       {[...Array(25)].map((_, index) => (
//         <div key={index} className="w-1/6 bg-gray-200 h-32 rounded-lg mb-4 animate-pulse relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-gray-300 opacity-50 rounded-lg"></div>
//           <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-gray-300 to-transparent opacity-50 rounded-lg"></div>
//           <h2 className="text-gray-300 font-semibold w-3/4 h-4 mb-2 animate-pulse bg-gray-400 mt-4 rounded"></h2>
//           <h3 className="text-gray-600 mb-2 w-1/2 h-4 animate-pulse bg-gray-300 rounded"></h3>
//           <p className="text-gray-600 mb-2 w-3/4 h-4 animate-pulse bg-gray-300 rounded"></p>
//           <h4 className="text-gray-600 font-semibold mt-4 w-1/3 h-4 animate-pulse bg-gray-300 rounded"></h4>
//         </div>
//       ))}
//     </div>
//   );
// };



// export default Shimmer;





// import { SHIMMER_RES_CARDS_COUNT } from '../config'; // this is an no 
// import { SHIMMER_MENU_ITEMS_COUNT } from '../config'; // this is an no
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
