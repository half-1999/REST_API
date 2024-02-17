// controllers/mentorController.js

const Mentor = require("../models/Mentor");

exports.createMentor = async (req, res) => {
  try {
    const { name, email, contact, collegeName, city, address, domain } =
      req.body;

    // Check if a mentor with the same email already exists
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res
        .status(400)
        .json({ error: "A mentor with this email already exists" });
    }

    const mentorData = {
      name,
      email,
      contact,
      collegeName,
      city,
      address,
      domain,
    };

    const mentor = new Mentor(mentorData);
    console.log(mentor);
    await mentor.save();
    res.status(201).json({ message: "Mentor created successfully", mentor });
  } catch (error) {
    console.error("Error creating mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json({ mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // Get mentor by ID
// exports.getMentorById = async (req, res) => {
//   try {
//     const mentor = await Mentor.findById(req.params.id);
//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }
//     res.status(200).json({ mentor });
//   } catch (error) {
//     console.error("Error fetching mentor:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Update mentor by ID
// exports.updateMentor = async (req, res) => {
//   try {
//     const { name, email, contact, collegeName, city, address, domain } =
//       req.body;
//     const resume = req.file.path; // File path of the uploaded resume

//     const mentor = await Mentor.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         email,
//         contact,
//         collegeName,
//         city,
//         address,
//         resume,
//         domain,
//       },
//       { new: true }
//     );

//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }

//     res.status(200).json({ message: "Mentor updated successfully", mentor });
//   } catch (error) {
//     console.error("Error updating mentor:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Delete mentor by ID
// exports.deleteMentor = async (req, res) => {
//   try {
//     const mentor = await Mentor.findByIdAndDelete(req.params.id);
//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }
//     res.status(200).json({ message: "Mentor deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting mentor:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
