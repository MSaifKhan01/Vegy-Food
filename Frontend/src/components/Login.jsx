import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SignIn } from "../utills/UserSlice";
import { GoogleButton } from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { Base_URL } from "../Config";
import useOnline from "../Hooks/useOnline.jsx";
import UserOffline from "./UserOffline.jsx";


function Login() {
  const [error, setError] = useState("");
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUserData = (e) => {
    const { name, value } = e.target;
    setLoginUserData({ ...loginUserData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(SignIn(loginUserData));
      if (action.payload) {
        console.log("Login Successful:", action.payload);
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("User", JSON.stringify(action.payload.isUser));
        alert(action.payload.msg);
        setLoginUserData({ email: "", password: "" }); // Reset input fields
        // navigate("/");
        window.location.href = "http://localhost:1234";

      } else {
        alert(action.payload.msg);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${Base_URL}/auth/google`;
  };

  useEffect(() => {
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
  }, []);

  let isOnline = useOnline();
  if (!isOnline) {
    return <UserOffline />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Your Email"
            name="email"
            value={loginUserData.email}
            onChange={setUserData}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Your Password"
            name="password"
            value={loginUserData.password}
            onChange={setUserData}
            className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
          />
      

          
          <button
            onClick={handleLogin}
            className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login here
          </button>
        </form>
        
        <div className="flex items-center justify-center my-4">
          <GoogleButton type="dark" onClick={handleGoogleAuth} />
        </div>
        <div className="text-center">
        <Link to="/reset-password" className="text-red-500 ml-2 hover:text-red-700 mb-1 font-bold">
  Forgot password?
</Link>
          <p className="text-md font-semibold mt-2 pt-1 mb-0 text-blue-dark">
            Don't have an account ?
            <Link
              to="/Signup"
              className="text-red-500 ml-2 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
            >
              Create an Account
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
