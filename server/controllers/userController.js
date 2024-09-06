// const { default: allUser } = require("../../client/src/components/allUser");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(201).json("Please Provide all the field");
    }
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Login handle
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(201).json("Please Provide all the field");
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(500).json("User Not Found");
    }
    if (existUser.password !== password) {
      return res.status(500).json("Incorrect password");
    }

    res.status(200).json(existUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};
exports.getAllUser = async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
  return allUsers;
};
// Other user-related methods
