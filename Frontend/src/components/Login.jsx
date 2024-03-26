import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SignIn } from "../utills/UserSlice";

function Login() {
    const [error, setError] = useState("");
    const [loginUserData, setLoginUserData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();

    const setUserData = (e) => {
        const { name, value } = e.target;
        setLoginUserData({ ...loginUserData, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const action = await dispatch(SignIn(loginUserData));
            console.log("Login Successful:", action.payload);
            sessionStorage.setItem("token",action.payload.
            token)
            alert(action.payload.msg);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleAuth = () => {
        // window.location.href = "https://vegy-food.onrender.com/auth/google";
        window.location.href = "http://localhost:4000/auth/google";
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userDataParam = urlParams.get('userData');

        if (userDataParam !== null) {
            try {
                const userDataObj = JSON.parse(decodeURIComponent(userDataParam));
                console.log("From SignIn-----",userDataObj)
                sessionStorage.setItem("userData", userDataParam);
            } catch (error) {
                setError('Error parsing user data');
            }
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form className="flex flex-col items-center">
                    <input type="text" placeholder="Your Email" name="email" onChange={setUserData} className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full" />
                    <input type="password" placeholder="Your Password" name="password" onChange={setUserData} className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full" />
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Login here</button>
                </form>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full" onClick={handleGoogleAuth}>
                    Sign in with Google
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
