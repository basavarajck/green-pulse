// server/src/config/teamUpload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const logger = require("./logger");

// Determine upload directory based on environment
// In serverless (Vercel), use /tmp; locally use uploads/team
const uploadDir = process.env.VERCEL 
  ? "/tmp/uploads/team"
  : path.join(__dirname, "../../uploads/team");

// Ensure upload directory exists (with error handling for read-only file systems)
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (error) {
  logger.warn("Warning: Could not create upload directory. Running in read-only environment?", error.message);
  // Don't crash - let it fail later if uploads are attempted
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const teamUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = teamUpload;