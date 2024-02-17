const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const contactController = require("../controller/contactController");

// Route: POST /api/register
router.post("/register", authController.register);

// Route: POST /api/login
router.post("/login", authController.login);

// Route: POST /api/forgot-password
router.post("/forgot-password", authController.forgotPassword);

// Route: POST /api/reset-password
router.post("/reset-password/:token", authController.resetPassword);

// Contact route
router.post("/contact-us", contactController.contactUs);
router.get("/contacts", contactController.getAllContacts); // New route for getting all contacts

module.exports = router;
