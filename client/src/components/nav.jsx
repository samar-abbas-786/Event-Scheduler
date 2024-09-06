import React from "react";
import { FaCircleUser } from "react-icons/fa6";

import { IoTimer } from "react-icons/io5";
import { authContext } from "../contextApi/auth";

import { Link, to } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {
  const { authorized, user } = useContext(authContext);
  return (
    <nav className="bg-gradient-to-r from-black to-gray-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-semibold flex space-x-4 ">
          <IoTimer />
          <p className="text-2xl font-sans">Slotify</p>
        </div>
        <ul className="hidden md:flex space-x-14">
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              About
            </a>
          </li>
          {/* <li>
            <a href="#" className="hover:text-gray-300 transition">
              Services
            </a>
          </li> */}{" "}
          {user && user.role === "admin" ? (
            <Link to="/AllUser">All Users</Link>
          ) : null}
          <li>
            <a href="#" className="hover:text-gray-300 transition">
              Contact
            </a>
          </li>
        </ul>
        <div className="hidden md:flex">
          {authorized ? (
            <div className="text-3xl mr-6">
              {" "}
              <FaCircleUser />
            </div>
          ) : (
            <button className="bg-indigo-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition">
              <Link to="/signup"> Sign Up</Link>
            </button>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
