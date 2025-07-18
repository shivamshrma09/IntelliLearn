const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for verifying the JWT token
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const studentRoutes = require("./routes/student.route");
const Student = require("./models/student.models"); // Import the Student model, assuming it's in ./models/Student

const app = express();
connectToDb();

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Extract the token from the authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // If no token, respond with 401
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT secret
        req.userId = decoded.id; // Store the decoded user ID in the request object
        next(); // Move to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' }); // If token is invalid, respond with 403
    }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic route for testing
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Student routes
app.use("/students", studentRoutes);
// verifyToken
// API route to fetch student data, with token verification
app.get('/api/user', verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.userId).select('-password'); // exclude sensitive
    if (!student) return res.status(404).json({ message: 'Student not found' });
    // Send user object only, without token
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = app;
