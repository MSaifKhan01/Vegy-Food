import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SignUp } from "../utills/UserSlice";
import { GoogleButton } from "react-google-button";
import { Link } from "react-router-dom";
import { Base_URL } from "../Config";
import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";
const Signup = () => {
  const [signUpData, setSignUpData] = useState({});
  const dispatch = useDispatch();

  const getSignUpData = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const Data = await dispatch(SignUp(signUpData));
    // console.log("SignUp----", Data);
    // alert(Data.payload.msg);
    
    // Clear input fields after successful signup
    setSignUpData({});
  };

  const handleGoogleAuth = () => {
    // window.location.href = "https://vegy-food.onrender.com/auth/google";
    window.location.href = `${Base_URL}/auth/google`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataParam = urlParams.get("userData");

    if (userDataParam !== null) {
      try {
        const userDataObj = JSON.parse(decodeURIComponent(userDataParam));
        sessionStorage.setItem("token", userDataObj.token);
        sessionStorage.setItem(
          "User",
          JSON.stringify(userDataObj.existingUser)
        );
      } catch (error) {
        setError("Error parsing user data");
      }
    }
  }, []);
  let isOnline = useOnline();
  if (!isOnline) {
    return <UserOffline />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Your name"
              onChange={getSignUpData}
              value={signUpData.username || ""} 
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Your email"
              onChange={getSignUpData}
              value={signUpData.email || ""} 
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              onChange={getSignUpData}
              value={signUpData.password || ""} 
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSignup}
              className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-full"
            >
              {" "}
              Sign Up
            </button>
          </div>
        </form>
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          onClick={handleGoogleAuth}
        >
          Sign Up with Google
        </button> */}

        
<p className="text-center text-bio font-semibold mx-4 mb-0">
                    OR
                  </p>
               
                <div className="flex items-center justify-center  my-4">
                  <GoogleButton type="dark" onClick={handleGoogleAuth} />
                </div>
                <div className="text-center">
                  <p className="text-md font-semibold mt-2 pt-1 mb-0 text-blue-dark">
                    Do you have an account  ?
                    <Link
                      to="/login"
                      className="text-red-500 ml-2 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out "
                    >
                      Login Here
                      
                    </Link>
                  </p>
                </div>
      </div>
    </div>
  );
};

export default Signup;
