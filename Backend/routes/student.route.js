const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../models/student.models");
const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("email").isEmail(),
    body("name").notEmpty(),
    body("password").isLength({ min: 6 }),
    body("course").notEmpty(),
  ],
  async (req, res) => {
    try {
      const { name, email, password, course } = req.body;

      const existing = await Student.findOne({ email });
      if (existing) return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newStudent = new Student({ name, email, password: hashedPassword, course });

      await newStudent.save();

      const token = newStudent.generateAuthToken();
      const userData = { _id: newStudent._id, name, email };

      res.status(201).json({ user: userData, token });
    } catch (err) {
      res.status(500).json({ message: "Registration failed", error: err.message });
    }
  }
);

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      totalPoints: user.totalPoints,
      rank: user.rank,
      streak: user.streak,
      numberOfBatchesCompleted: user.numberOfBatchesCompleted,
    };

    res.json({ user: userData, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
