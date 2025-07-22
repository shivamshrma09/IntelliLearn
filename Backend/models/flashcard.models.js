const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  batchId: { type: String, required: true },
  topicId: { type: String, required: true },
  subject: { type: String, default: 'Study Material' },
  batchName: { type: String, default: 'General' },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model("Flashcard", FlashcardSchema);