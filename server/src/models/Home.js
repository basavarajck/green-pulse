const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  about: { type: String, required: true },
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  achievements: { type: [String], default: [] }
});

module.exports = mongoose.model("Home", homeSchema);
