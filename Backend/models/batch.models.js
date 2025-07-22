const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  subject: String,
  difficulty: String,
  language: String,
  estimatedTime: String,
  instructor: String,
  image: String,
  progress: Number,
  totalChapters: Number,
  completedChapters: Number,
  enrolledStudents: Number,
  type: String,
  aiLearningPlan: Object,
  completionStatus: Array,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Batch", BatchSchema);