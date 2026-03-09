// server/src/models/TeamMember.js
const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  role:        { type: String, required: true },
  email:       { type: String, required: true },
  designation: { type: String, default: "" },
  image:       { type: String, required: true },
}, { timestamps: true });

// Indexes for performance
teamMemberSchema.index({ role: 1 }); // For filtering by role
teamMemberSchema.index({ email: 1 }); // For email lookups
teamMemberSchema.index({ name: 1 }); // For alphabetical sorting

module.exports = mongoose.model("TeamMember", teamMemberSchema);