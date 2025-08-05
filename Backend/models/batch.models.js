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
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Batch", BatchSchema);