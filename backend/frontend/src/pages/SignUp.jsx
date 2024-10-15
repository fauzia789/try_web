import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa"; 
const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",   
    address: "",
  });
  
  const navigate = useNavigate();

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault();
    const { username, email, password, address } = Values;

    if (username === "" || email === "" || password === "" || address === "") {
      alert("All fields are required");
    } else {
      try {
        const response = await axios.post(`${window.location.origin}/api/v1/sign-up`, Values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert(response.data.message);
        navigate("/LogIn");
      } catch (error) {
        console.error('Error response:', error.response);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="example@gmail.com"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="********"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="123 Main St, City, Country"
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Social Media Sign Up */}
        <div className="mt-6 text-center">
  <p className="text-gray-600 mb-4">Or sign up with</p>
  <div className="flex justify-center space-x-4">
    <button
      className="flex items-center space-x-2 text-gray-600 border-x-2 border-blue-800 py-2 px-4 rounded-md hover:bg-blue-200 hover:text-white transition"
    >
      <FaFacebookF className="text-blue-600" /> 
      <span> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a></span>
    </button>
    <button
      className="flex items-center space-x-2 text-gray-600 border-x-2 border-red-800 py-2 px-4 rounded-md hover:bg-red-200 hover:text-white transition"
    >
      <FaGoogle className="text-red-500" /> 
      <span> <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Google</a></span>
    </button>
  </div>
</div>

        {/* Already have an account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
