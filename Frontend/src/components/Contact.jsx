import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/Mail", formData);
      alert("Message sent successfully!");
      setFormData({ username: "", email: "", message: "" });
    } catch (error) {
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#35374B] to-[#121212] text-base w-screen h-screen flex justify-center items-center">
      <div className="m-6 w-2/3 ">
        <div className="container mx-auto p-10 bg-white rounded-lg shadow-lg flex justify-around ">
          <div className="text-center md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>
            <img
              className="w-40 h-40 mx-auto mb-8 rounded-full"
              src="https://avatars.githubusercontent.com/u/119418918?u=7eb9cd12a2a20321bd22c60b25a91450629ec411&v=4"
              alt="Saif Image"
            />
            <p className="text-lg text-gray-600 mb-4">I'm Mohd Saif Khan. How can I help you?</p>
            <div className="flex justify-center mb-4">
              <a href="https://github.com/MSaifKhan01" target="_blank" rel="noopener noreferrer" className="mr-4 ">
                <img src="https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png" alt="GitHub Icon" className="w-10 h-10" />
              </a>
              <a href="https://www.linkedin.com/in/mohd-saif-khan-3b4979202/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn2.iconfinder.com/data/icons/popular-social-media-flat/48/Popular_Social_Media-22-1024.png" alt="LinkedIn Icon" className="w-14 h-14" />
              </a>
            </div>
          </div>
          <form className="space-y-4 md:w-1/2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-200 text-black font-bold py-3 px-8 rounded-md hover:bg-red-300 focus:outline-none focus:bg-red-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
