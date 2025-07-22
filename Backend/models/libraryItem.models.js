const mongoose = require("mongoose");

const LibraryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  subject: { type: String, required: true },
  batch: { type: String },
  content: { type: String, required: true },
  readTime: { type: String },
  lastAccessed: { type: String },
  bookmarked: { type: Boolean, default: false },
  tags: [{ type: String }],
  rating: { type: Number },
  views: { type: Number },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  url: { type: String },
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LibraryItem", LibraryItemSchema);