const express = require("express");
const {
  createUser,
  getAllUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/getAllUser", getAllUser);
router.post("/login", loginUser);

// Other user routes

module.exports = router;
