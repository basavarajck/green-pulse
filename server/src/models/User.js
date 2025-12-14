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
  githubId: { type: String }, // Added this
  role: { type: String, default: "user" } // user | admin
});

module.exports = mongoose.model("User", userSchema);
