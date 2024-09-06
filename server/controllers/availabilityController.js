const Availability = require("../models/availabilityModel");

exports.addAvailability = async (req, res) => {
  try {
    const { start, end, duration, user } = req.body; // Capture user field
    if (!start || !end || !duration || !user) {
      return res.status(400).json("Please provide all required fields");
    }

    // Create new availability
    const availability = await Availability.create({
      start,
      end,
      duration,
      user,
    });

    res.status(201).json(availability);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserAvailability = async (req, res) => {
  try {
    const userId = req.params.userId;
    const availability = await Availability.find({ user: userId });
    res.status(200).json(availability);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
