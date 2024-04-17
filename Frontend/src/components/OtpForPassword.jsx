// import React, { useState } from 'react'
// // import { ToastContainer, toast } from 'react-toastify';
// import { useLocation, useNavigate } from 'react-router-dom';
// // import { userVerify } from "../services/Apis";

// const OtpForPassword = () => {
//   const [otp, setOtp] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const LoginUser = async (e) => {
//     e.preventDefault();

//     if (otp === "") {
//       toast.error("Enter Your Otp")
//     } else if (!/[^a-zA-Z]/.test(otp)) {
//       toast.error("Enter Valid Otp")
//     } else if (otp.length < 6) {
//       toast.error("Otp Length minimum 6 digit")
//     } else {
//       const data = {
//         otp,
//         email: location.state
//       }

//       const response = await userVerify(data);
//       if (response.status === 200) {
//         localStorage.setItem("userdbtoken", response.data.userToken);
//         toast.success(response.data.message);
//         setTimeout(() => {
//           navigate("/dashboard")
//         }, 5000)
//       } else {
//         toast.error(response.response.data.error)
//       }
//     }
//   }

//   return (
//     <>
//       <section className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Please Enter Your OTP Here</h1>
//           <form className="space-y-4">
//             <div className="space-y-1">
//               <label htmlFor="otp" className="font-semibold text-gray-600 block">OTP</label>
//               <div className="flex justify-center gap-2">
//     {[...Array(6)].map((_, index) => (
//         <input
//             key={index}
//             type="text"
//             maxLength={1}
//             className="w-8 h-8 text-center border rounded-md focus:outline-none focus:border-blue-500"
//             value={otp[index] || ''}
//             onChange={(e) => handleInputChange(e, index)}
//         />
//     ))}
// </div>

//             </div>
//             <button
//               className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
//               onClick={LoginUser}
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </section>
//       {/* <ToastContainer /> */}
//     </>
//   )
// }

// export default OtpForPassword;






import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Base_URL } from '../Config';
// import { userVerify } from "../services/Apis";

const OtpForPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // Perform validation or other checks as needed
    // For simplicity, we assume the email is valid

    // Call the backend to send OTP to the provided email
    // Here, we simulate the backend call with a timeout
    // Replace this with your actual backend call

    const res= await fetch(`${Base_URL}/request-otp`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      setShowOtpInput(true);
      let emaildata= await res.json(); 
      console.log("jghgbh1",emaildata)
    }
    // setTimeout(() => {
    //   setShowOtpInput(true); // Show the OTP input boxes after a delay
    // }, 1000);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${Base_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
  
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userdbtoken", data.message); // Change 'userToken' to 'message'
        // Redirect to the dashboard upon successful verification
        navigate("/login");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error here (e.g., display error message to user)
    }
  };
  

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {!showOtpInput ? "Enter Your Email" : "Enter Your OTP Here"}
        </h1>
        {!showOtpInput ? (
          <form className="space-y-4" onSubmit={handleEmailSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="font-semibold text-gray-600 block">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleOtpSubmit}>
            <div className="space-y-1">
              {/* <label htmlFor="otp" className="font-semibold text-gray-600 block">OTP</label> */}
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-8 h-8 text-center border rounded-md focus:outline-none focus:border-blue-500"
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(''));
                    }}
                    required
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default OtpForPassword;

