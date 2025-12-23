// server/models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },  // Rich HTML content with embedded images
  coverImage: { type: String },  // Main cover image URL
  date: { type: String, required: true },  // e.g., "23 Dec 2025"
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);
