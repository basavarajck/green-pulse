const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  link: { type: String, default: "" },
  stack: { type: [String], default: [] },
  date: { type: String, default: "" }
}, {
  timestamps: true
});

// Indexes for performance
projectSchema.index({ createdAt: -1 }); // For sorting by creation date
projectSchema.index({ stack: 1 }); // For filtering by tech stack
projectSchema.index({ title: 'text', description: 'text' }); // Full-text search

module.exports = mongoose.model("Project", projectSchema);
