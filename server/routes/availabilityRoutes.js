const express = require("express");
const { addAvailability, getUserAvailability } = require("../controllers/availabilityController");
const { isAuthorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", addAvailability);
router.get("/:userId", getUserAvailability);

// Other availability routes

module.exports = router;
