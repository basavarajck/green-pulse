// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   googleId: { type: String }, 
//   role: { type: String, default: "user" } // user | admin
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin"] }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Indexes for performance
userSchema.index({ email: 1 }); // For login lookups
userSchema.index({ googleId: 1 }); // For OAuth lookups
userSchema.index({ githubId: 1 }); // For OAuth lookups
userSchema.index({ role: 1 }); // For admin queries

module.exports = mongoose.model("User", userSchema);
