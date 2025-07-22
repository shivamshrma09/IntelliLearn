const mongoose = require("mongoose");

const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  type: { type: String },
  deadline: { type: String },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  tags: [{ type: String }],
  url: { type: String },
  postedDate: { type: String },
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Opportunity", OpportunitySchema);