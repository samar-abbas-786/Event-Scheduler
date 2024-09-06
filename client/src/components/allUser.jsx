import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../contextApi/auth";
import axios from "axios";
import { motion } from "framer-motion";

const AllUser = () => {
  const { user, setUser } = useContext(authContext); // Fetch users from context
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [availability, setAvailability] = useState([]); // Track availability data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getAllUser"
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [setUser]);

  // Function to handle user click and fetch availability
  const handleUserClick = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/availability/${userId}`
      );
      setSelectedUser(userId); // Store the selected user
      setAvailability(response.data); // Store the fetched availability data
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-gray-600">
      <motion.h1
        className="text-4xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Users
      </motion.h1>

      <motion.div
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* List of all users */}
        <ul className="space-y-4">
          {user && user.length > 0 ? (
            user.map((u) => (
              <motion.li
                key={u._id}
                className="p-4 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleUserClick(u._id)} // On user click
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{u.name}</span>
                  <span className="text-gray-500">{u.email}</span>
                </div>
              </motion.li>
            ))
          ) : (
            <motion.p
              className="text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No users found
            </motion.p>
          )}
        </ul>

        {/* Availability section */}
        {selectedUser && (
          <motion.div
            className="mt-8 bg-gray-50 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Availability
            </h2>
            <ul className="space-y-2">
              {availability.length > 0 ? (
                availability.map((slot) => (
                  <li
                    key={slot._id}
                    className="p-3 bg-white shadow rounded-lg border border-gray-200"
                  >
                    <div className="flex space-x-5">
                      <p> Date: {new Date(slot.start).toLocaleDateString()}</p>{" "}
                      <b> --- </b>
                      <p>
                        {" "}
                        Date: {new Date(slot.end).toLocaleDateString()}
                      </p>{" "}
                    </div>

                    <p>Duration: {slot.duration} minutes</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No availability found</p>
              )}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AllUser;
