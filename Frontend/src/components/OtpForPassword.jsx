
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Base_URL } from '../Config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { EmailforPasswordOTP, OTPVerify, ResetPassword } from '../utills/UserSlice';

const OtpForPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {

      const action = await dispatch(EmailforPasswordOTP(email));
      // console.log("hjjj","-----",action)

      sessionStorage.setItem("EmailForPasswordUpdate", email);

      if (action.meta.requestStatus==="fulfilled" ) {
        toast.success("OTP sent successfully!");
        setShowOtpInput(true);
      } else {
        toast.error(action.payload.msg);
      }
    } catch (error) {
      // console.error("Error sending OTP:", error);
      toast.error(action.payload.msg);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {

      const action = await dispatch(OTPVerify(otp));
      // console.log(action)

      if (action.meta.requestStatus==="fulfilled" && action.payload.msg==="OTP verified successfully") {
        toast.success("OTP verified successfully!");
        setShowPasswordInput(true);
      } else {
        // throw new Error("Invalid OTP");
        toast.error("Invalid OTP");
      }
    } catch (error) {
      // console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailForPasswordUpdate = sessionStorage.getItem("EmailForPasswordUpdate");
      const data={
        emailForPasswordUpdate, newPassword
      }
  

      const action = await dispatch(ResetPassword(data))
      // console.log("fromotpforPasswordC",action)

      if (action.meta.requestStatus==="fulfilled" && action.payload.msg==="Password updated successfully") {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        toast.error(action.payload.msg);
      }
    } catch (error) {
      // console.error("Error updating password:", error);
      toast.error(action.payload.msg);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {!showOtpInput
            ? "Enter Your Email"
            : !showPasswordInput
            ? "Enter Your OTP Here"
            : "Set Your New Password"}
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
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        ) : !showPasswordInput ? (
          <form className="space-y-4" onSubmit={handleOtpSubmit}>
            <div className="space-y-1">
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-8 h-8 text-center border rounded-md focus:outline-none focus:border-red-500"
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
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div className="space-y-1">
              <label htmlFor="password" className="font-semibold text-gray-600 block">New Password</label>
              <input
                type="password"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                placeholder="Enter your new password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Set Password
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default OtpForPassword;
