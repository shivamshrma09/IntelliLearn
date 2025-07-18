const studentService = require("../services/student.service");
const studentModel = require("../models/student.models");
const { validationResult } = require("express-validator");

// Register Student
exports.RegisterStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password , cource } = req.body;
    console.log("Name:", name);

    console.log("Checking for existing user with email:", email);
    const isUserAlready = await studentModel.findOne({ email });
    console.log("User exists:", isUserAlready);

    if (isUserAlready) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await studentModel.hashPassword(password);
    const student = await studentService.createStudent({
      name,
      email,
      password: hashedPassword,
      cource,
    });
    const token = student.generateAuthToken();

    res.status(201).json({
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        cource: student.cource,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



exports.loginstudent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const student = await studentModel.findOne({ email }).select("+password");

  if (!student) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await student.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = student.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, student });
};
