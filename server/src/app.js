require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Passport (Important: Place before routes)
require("./config/passport");
app.use(passport.initialize());

// Import routes
const homeRoutes = require("./routes/homeRoutes");
const teamRoutes = require("./routes/teamRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
// Register routes
app.use("/home", homeRoutes);
app.use("/team", teamRoutes);
app.use("/events", eventRoutes);
app.use("/announcements", announcementRoutes);
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Club Backend API is running...");
});

// Connect to MongoDB and start server
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB Atlas");
    

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Database connection error:", err);
    console.log("MONGO_URI =", process.env.MONGO_URI);
  }
}

start();
