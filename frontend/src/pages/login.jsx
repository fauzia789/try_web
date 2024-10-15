import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { FaFacebookF, FaGoogle } from "react-icons/fa"; 

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `https://try-web-pbcm.onrender.com`,
          Values
        );
        
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        navigate("/profile");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
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
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            onClick={submit}
          >
            Login
          </button>
        </form>

        {/* Social Media Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">Or login with</p>
          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center space-x-2 text-gray-600 border-x-2 border-blue-800 py-2 px-4 rounded-md hover:bg-blue-200 hover:text-white transition"
            >
              <FaFacebookF className="text-blue-600" /> 
              <span>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  Facebook
                </a>
              </span>
            </button>
            <button
              className="flex items-center space-x-2 text-gray-600 border-x-2 border-red-800 py-2 px-4 rounded-md hover:bg-red-200 hover:text-white transition"
            >
              <FaGoogle className="text-red-500" />
              <span>
                <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  Google
                </a>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
