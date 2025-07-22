const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  content: { type: String },
  resources: [{ type: String }],
  order: { type: Number, required: true }
});

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  topics: [TopicSchema],
  completed: { type: Boolean, default: false }
});

const BatchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  subject: String,
  difficulty: String,
  language: String,
  estimatedTime: String,
  instructor: String,
  image: String,
  logo: { type: String },
  progress: Number,
  totalChapters: Number,
  completedChapters: Number,
  enrolledStudents: Number,
  type: String,
  aiLearningPlan: Object,
  completionStatus: Array,
  chapters: [ChapterSchema],
  createdAt: { type: Date, default: Date.now },
  certificateTemplate: { type: String },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Batch", BatchSchema);
