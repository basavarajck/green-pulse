const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  link: { type: String, default: "" },
  stack: { type: [String], default: [] },
  date: { type: String, default: "" }
});

module.exports = mongoose.model("Project", projectSchema);
