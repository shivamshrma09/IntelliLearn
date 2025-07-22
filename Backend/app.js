const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
const studentRoutes = require("./routes/student.route");
const batchRoutes = require("./routes/batch.route");
const flashcardRoutes = require("./routes/flashcard.route");
const certificateRoutes = require("./routes/certificate.route");
const libraryRoutes = require("./routes/library.route");
// const resourcesRoutes = require("./routes/resources.route");
const opportunitiesRoutes = require("./routes/opportunities.route");
const testsRoutes = require("./routes/tests.route");
const Student = require("./models/student.models");
const Batch = require("./models/batch.models"); // ✅ [IMPORTANT] Corrected import

const app = express();

// Connect to MongoDB 
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT token verify middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Test route
app.get("/", (req, res) => {
  res.send("Hello World from backend");
});

// Routes
app.use("/students", studentRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/library", libraryRoutes);
// app.use("/api/resources", resourcesRoutes);
app.use("/api/opportunities", opportunitiesRoutes);
app.use("/api/tests", testsRoutes);

// 🛡️ Get logged-in student (with token)
app.get("/api/user", verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.userId).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/batchesdetails', async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching batches' });
  }
});

// These routes are now handled by the batch.route.js file

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Export the app for use in server.js
module.exports = app;
