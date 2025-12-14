const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },   // e.g., "10 Dec 2025"
  image: { type: String },                  // poster URL
  link: { type: String },                   // event registration link
  isUpcoming: { type: Boolean, default: true }
});

module.exports = mongoose.model("Event", eventSchema);
