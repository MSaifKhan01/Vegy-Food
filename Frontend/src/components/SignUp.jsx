import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SignUp } from "../utills/UserSlice";

const Signup = () => {
    const [signUpData, setSignUpData] = useState({});
    const dispatch = useDispatch();

    const getSignUpData = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const Data = await dispatch(SignUp(signUpData));
        console.log("SignUp----", Data);
        alert(Data.payload.msg);
    };

    const handleGoogleAuth = () => {
        window.location.href = "http://localhost:4000/auth/google";
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userDataParam = urlParams.get('userData');

        if (userDataParam !== null) {
            try {
                const userDataObj = JSON.parse(decodeURIComponent(userDataParam));
                console.log("From SignUp-----",userDataObj)
                sessionStorage.setItem("userData", userDataParam);
            } catch (error) {
                setError('Error parsing user data');
            }
        }
    }, []);

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
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button> */}

                        <button onClick={handleSignup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"> Sign Up</button>
                    </div>
                </form>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                onClick={handleGoogleAuth}
            >
                Sign Up with Google
            </button>
            </div>
           
        </div>
    );
};

export default Signup;
