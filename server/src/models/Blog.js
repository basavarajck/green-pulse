// server/models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String },
  date: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Indexes for performance
blogSchema.index({ createdAt: -1 }); // For sorting by date (newest first)
blogSchema.index({ tags: 1 }); // For filtering by tags
blogSchema.index({ author: 1 }); // For filtering by author
blogSchema.index({ title: 'text', content: 'text' }); // Full-text search

module.exports = mongoose.model("Blog", blogSchema);
