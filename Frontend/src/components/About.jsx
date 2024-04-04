import React from 'react';
import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";

import AboutImage from "../Image/AboutImage.png"

const About = () => {
  let isOnline = useOnline();
  if (!isOnline) {
    return <UserOffline />;
  }
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-xl w-full">
        <img src={AboutImage} alt="Image" className="w-full h-96 p-8 object-cover rounded-t-lg" />
        <div className="text-center mt-8">
          <h3 className="text-green-400 text-2xl font-bold mb-2">
            Make your <span className="text-yellow-400">choice</span> right now!
          </h3>
          <p className="text-black text-lg mb-4">Vegy Food brings the essence of authenticity to your home, delivering a diverse array of delectable dishes right to your doorstep. Our service spans seamlessly across all regions, ensuring you can savor the rich and varied flavors of our cuisine wherever you are. Indulge in the convenience of our food delivery service and experience a culinary journey like no other.</p>
          <a href="https://github.com/MSaifKhan01" target='_blank' rel="noopener noreferrer" className="inline-block bg-yellow-400 py-2 px-4 rounded-full text-white hover:bg-yellow-500 transition duration-300">
            <span> My Github </span>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block w-6 h-6 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>        
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
