const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  title: String,
  subject: String,
  difficulty: String,
  language: String,
  estimatedTime: String,
  instructor: String,
  image: String,
  description: String,
  totalChapters: Number,
  type: String,
  progress: { type: Number, default: 0 },
  completedChapters: { type: Number, default: 0 },
  enrolledStudents: { type: Number, default: 1 },
  studyTime: { type: Number, default: 0 }, // in minutes
  lastAccessed: { type: Date, default: Date.now },
  studyStreak: { type: Number, default: 0 },
  achievements: [{
    id: String,
    name: String,
    description: String,
    earnedAt: Date
  }],
  studyGroup: {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    discussions: [{
      message: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      createdAt: { type: Date, default: Date.now }
    }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Batch", BatchSchema);