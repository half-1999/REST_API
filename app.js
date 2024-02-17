// Import necessary packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use("/api/v1", routes);

module.exports = app;
