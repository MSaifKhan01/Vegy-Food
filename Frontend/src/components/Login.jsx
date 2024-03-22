import React, { useState ,useEffect} from "react";

function Login() {
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);

    const handleGoogleAuth = async () => {
        try {
            // Redirect the user to Google authentication directly
            window.location.href = "http://localhost:4000/auth/google";
        } catch (error) {
            setError(error.message);
        }
    };

  

    useEffect(() => {
        // Parse URL to get userData parameter
        const urlParams = new URLSearchParams(window.location.search);
        const userDataParam = urlParams.get('userData');
    
        // If userData parameter exists, parse it into an object
        if (userDataParam !== null) {
            try {
                const userDataObj = JSON.parse(decodeURIComponent(userDataParam));
                sessionStorage.setItem("userData", userDataParam); // Use userDataParam here
                const userDataFromStorage = sessionStorage.getItem("userData");
                setUserData(userDataObj);
                console.log("from login Componnet :--", userData,"Local---> " ,userDataFromStorage);
            } catch (error) {
                setError('Error parsing user data');
            }
        }
    }, []);
    

    return (
        <div className="flex justify-center items-center mt-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleAuth}>
                Sign in with Google
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          
        </div>
    );
}

export default Login;
