const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  isUpcoming: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexes for performance
eventSchema.index({ isUpcoming: 1, date: -1 }); // Compound index for filtering and sorting
eventSchema.index({ createdAt: -1 }); // For sorting by creation date

module.exports = mongoose.model("Event", eventSchema);
