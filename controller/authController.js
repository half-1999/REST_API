const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const JWT_SECRET = "mysecretkey123"; // Register a new user

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "amanCoursry@gmail.com",
        pass: "iiwx hbtw fgrd rbsf",
      },
    });
    const resetUrl = `http://localhost:8000/api/reset-password/${token}`;

    const mailOptions = {
      from: "Aman Sharma 👻 <amanCoursry@gmail.com>",
      to: email,
      subject: "Password Reset Request",
      html: `
      <p>Hello ${name},</p>
      <p>You've requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error occurred while sending email: ", err);
      } else {
        console.log("Email sent successfully!", info.response);
      }
    });
  } catch (error) {
    console.log("Error: Failed to send email", error);

    // return res.status(400).json({ msg: error.message });
  }
};

//Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, countryCode, phone } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    user = new User({
      name,
      email,
      password: hashedPassword,
      countryCode,
      phone,
    });
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ user, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ user, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if (user) {
      const randomString = randomstring.generate();
      // Update the user's token
      await User.updateOne(
        { email: email },
        {
          $set: {
            token: randomString,
          },
        }
      );

      sendResetPasswordMail(user.name, user.email, randomString);
      res.status(200).json({ msg: "Email sent successfully" });
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await User.findOne({ token: token });

    if (tokenData) {
      const newPassword = req.body.password;

      // Hash the new password before storing it
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the token
      const userData = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: hashedPassword, token: "" } },
        { new: true }
      );

      return res
        .status(200)
        .json({ msg: "Password Reset Successful", data: userData });
    } else {
      return res.status(404).json({ msg: "Token Not Found" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};
