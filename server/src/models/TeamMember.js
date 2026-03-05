// server/src/models/TeamMember.js
const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  role:        { type: String, required: true },
  email:       { type: String, required: true },
  designation: { type: String, default: "" },
  image:       { type: String, required: true }, // relative path e.g. "uploads/team/abc.jpg"
}, { timestamps: true });

module.exports = mongoose.model("TeamMember", teamMemberSchema);