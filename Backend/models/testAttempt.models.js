const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  selectedOption: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  timeTaken: { type: Number } // seconds
});

const TestAttemptSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number }, // total time in seconds
  answers: [AnswerSchema],
  completed: { type: Boolean, default: false },
  analysis: {
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    accuracy: { type: Number },
    speed: { type: Number },
    recommendations: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TestAttempt", TestAttemptSchema);