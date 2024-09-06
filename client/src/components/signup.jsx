import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../contextApi/auth";
import axios from "axios";
import { useContext } from "react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setAuthorized, setUser } = useContext(authContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        // role: "user",
      });
      console.log(response.data);
      setUser(response.data);
      setAuthorized(true);

      localStorage.setItem("token", response.data);

      // console.log(user);

      // Clear the form
      setSubmitted(true);
      setName("");
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err) {
      setAuthorized(false);

      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-gray-600">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full bg-gradient-to-r from-black to-gray-600">
        <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>

        {/* Success message */}
        {submitted && (
          <p className="text-green-500">Form submitted successfully!</p>
        )}

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Sign Up
            </button>
            <Link className="text-white font-bold" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
