// routes/mentorRoutes.js

const express = require("express");
const router = express.Router();
const mentorController = require("../controller/mentorController");

// Create mentor
router.post("/createMentor", mentorController.createMentor);

// Get all mentors
router.get("/getAllMentor", mentorController.getAllMentors);

module.exports = router;
