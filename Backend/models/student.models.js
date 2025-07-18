const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const BatchSchema = new mongoose.Schema({
  id: String,
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
  createdAt: { type: Date, default: Date.now },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cource: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  numberOfBatchesCompleted: { type: Number, default: 0 },
  batches: [BatchSchema],
});

studentSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
