import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { motion } from "framer-motion"; // For animations
import { authContext } from "../contextApi/auth";

const Hero = () => {
  const { user, setUser } = useContext(authContext);
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState({
    start: "",
    end: "",
    duration: 30, // default duration in minutes
    user: user?._id, // Replace with the actual user ID or pass dynamically
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      // Extract only the date part (YYYY-MM-DD) from the datetime-local input
      const dateOnly = value.split("T")[0];
      setAvailability((prev) => ({ ...prev, [name]: dateOnly }));
    } else {
      setAvailability((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:5000/api/availability",
        {
          start: availability.start,
          end: availability.end,
          duration: availability.duration,
          user: availability.user, // Send user ID
        }
      );
      alert("Availability saved successfully!");
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error saving availability:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="top flex w-full h-[90vh] justify-between px-8 items-center bg-gradient-to-r from-black to-gray-600">
      <div className="hero-text text-start font-sans h-[55vh] flex flex-col justify-evenly text-white text-md w-2/5 space-y-6">
        <h1 className="font-extrabold text-5xl leading-tight text-white">
          Welcome to Slotify
        </h1>
        <p className="font-light text-lg">
          Effortlessly manage your availability and schedule sessions with
          ease—built for flexibility, designed for you.
        </p>
        <button
          onClick={() => setIsModalOpen(true)} // Open modal
          className="bg-indigo-600 border-2 mt-8 border-indigo-700 hover:bg-indigo-700 text-white shadow-md shadow-gray-400 px-4 font-semibold py-2 rounded-md transition"
        >
          Get Started
        </button>
      </div>

      <div className="hero-cal w-2/5 p-8 rounded-lg">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded-lg"
        />
      </div>

      {/* Modal for date/time input */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Enter Availability</h2>
            <div className="space-y-4">
              <input
                type="date"
                name="start"
                value={availability.start}
                onChange={handleAvailabilityChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Start date"
              />
              <input
                type="date"
                name="end"
                value={availability.end}
                onChange={handleAvailabilityChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="End date"
              />
              <input
                type="number"
                name="duration"
                value={availability.duration}
                onChange={handleAvailabilityChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Duration in minutes"
                min="1"
                max="1440"
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleSubmit}
                className={`bg-indigo-600 border-2 border-indigo-700 hover:bg-indigo-700 text-white shadow-md px-4 py-2 rounded-md transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Availability"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Hero;
