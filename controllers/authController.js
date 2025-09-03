const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Basic server-side validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Basic server-side validation
  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ msg: "Phone number and password are required" });
  }

  try {
    // Check if user exists by phoneNumber
    const user = await User.findOne({ phoneNumber });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Return token and user data
    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { registerUser, loginUser };
