import React, { useState, useEffect } from "react";

function Login() {
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);
    const [loginUserData, setLoginUserData] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginUserData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login Successful:", data);
                setUserData(data);
                alert("Login Successful: " + JSON.stringify(data));
                console.log("jjjjjj",userData) // Convert data to string before passing to alert
            } else {
                console.log("Login Failed:", data);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleAuth = () => {
        // Redirect the user to Google authentication directly
        window.location.href = "http://localhost:4000/auth/google";
    };

    useEffect(() => {
        // Parse URL to get userData parameter
        const urlParams = new URLSearchParams(window.location.search);
        const userDataParam = urlParams.get('userData');

        // If userData parameter exists, parse it into an object
        if (userDataParam !== null) {
            try {
                const userDataObj = JSON.parse(decodeURIComponent(userDataParam));
                sessionStorage.setItem("userData", userDataParam);
                const userDataFromStorage = sessionStorage.getItem("userData");
                setUserData(userDataObj);
                console.log("from login Component:", userData, "Local--->", userDataFromStorage);
            } catch (error) {
                setError('Error parsing user data');
            }
        }
    }, []);

    return (
        <div className="flex justify-center items-center mt-10">
            <div>
                <form className="flex flex-col items-center">
                    <input type="text" value={loginUserData.email} placeholder="Your Email" name="email" onChange={(e) => {
                        setLoginUserData({ ...loginUserData, [e.target.name]: e.target.value })
                    }} className="border border-gray-400 rounded-lg px-4 py-2 mb-4" />
                    <input type="password" value={loginUserData.password} placeholder="Your Password" name="password" onChange={(e) => {
                        setLoginUserData({ ...loginUserData, [e.target.name]: e.target.value })
                    }} className="border border-gray-400 rounded-lg px-4 py-2 mb-4" />
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login here</button>
                </form>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleGoogleAuth}>
                Sign in with Google
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default Login;
