const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
const studentRoutes = require("./routes/student.route");
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

// Student authentication routes
app.use("/students", studentRoutes);

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

// ✅ POST /api/batches — Create a new batch
app.post("/api/batches", async (req, res) => {
  try {
    const batch = new Batch(req.body);
    await batch.save();
    res.status(201).json({ message: "Batch saved successfully", batch });
  } catch (error) {
    console.error("Error saving batch:", error.message);
    res.status(500).json({ message: "Error saving batch", error: error.message });
  }
});

// ✅ GET /api/batches — Get all batches
app.get("/api/batches", async (req, res) => {
  try {
    const batches = await Batch.find({});
    res.json(batches);
  } catch (error) {
    console.error("Error fetching batches:", error.message);
    res.status(500).json({ message: "Error fetching batches", error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
