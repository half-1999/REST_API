// models/Mentor.js

const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  collegeName: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  //   resume: { type: String, required: true }, // File path to the uploaded resume
  domain: { type: String, required: true },
  //   courses: [
  //     {
  //       type: String,
  //       required: true,
  //       enum: ["Course1", "Course2", "Course3", "Course4"],
  //     },
  //   ],
});

module.exports = mongoose.model("Mentor", mentorSchema);
