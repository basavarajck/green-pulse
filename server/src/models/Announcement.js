const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
}, {
  timestamps: true
});

// Indexes for performance
announcementSchema.index({ createdAt: -1 }); // For sorting (newest first)
announcementSchema.index({ date: -1 }); // For filtering by announcement date

module.exports = mongoose.model("Announcement", announcementSchema);
