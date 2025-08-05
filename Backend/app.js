const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
const studentRoutes = require("./routes/student.route");
const batchRoutes = require("./routes/batch.routes");
const progressRoutes = require("./routes/progress.routes");
const Student = require("./models/student.models");
const Batch = require("./models/batch.models"); 
const aiRoutes = require("./routes/ai.routes"); 
const app = express();


connectToDb();

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173', 
    'http://127.0.0.1:3000', 
    'http://127.0.0.1:5173',
    'https://intelli-learn-wie5.vercel.app',
    'https://intelli-learn-omega.vercel.app',
    'https://intelli-learn-mu.vercel.app',
    'https://intelli-learn-two.vercel.app',
    'https://intellilearn.vercel.app'
    'https://intelli-learn-beta.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("Hello World from backend");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/students", studentRoutes);
// app.use("/api", studentRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/progress", progressRoutes);
app.use("/ai", aiRoutes); // ✅ [IMPORTANT] Added AI routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
