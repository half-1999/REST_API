// controller/ContactController.js

const Contact = require("../models/Contact");

exports.contactUs = async (req, res) => {
  try {
    const { name, countryCode, phone, message, email } = req.body;

    // Create a new contact document
    const newContact = new Contact({
      name,
      countryCode,
      phone,
      message,
      email,
    });

    // Save the contact in the database
    await newContact.save();

    res.status(201).json({
      message: "Contact details saved successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Error saving contact details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    // Query the database to retrieve all contacts
    const contacts = await Contact.find();
    console.log(contacts);
    // Send the contacts in the response
    res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
