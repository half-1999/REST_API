const express = require("express");
const router = express.Router();
const leadController = require("../controller/leadController");
// const authMiddleware = require("../middleware/authMiddleware");

// Route: POST /api/lead
// Add middleware to authenticate before adding lead
router.post("/lead", leadController.addLead);

module.exports = router;
