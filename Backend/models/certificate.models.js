const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  batchId: { type: String, required: true },
  batchName: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  percentage: { type: Number, required: true },
  issueDate: { type: Date, default: Date.now },
  certificateUrl: { type: String },
  certificateId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Certificate", CertificateSchema);