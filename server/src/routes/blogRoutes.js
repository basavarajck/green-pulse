// server/routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { blogValidation } = require("../middleware/validators");

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin-only routes with validation
router.post("/", requireAuth, requireAdmin, blogValidation, addBlog);
router.put("/:id", requireAuth, requireAdmin, blogValidation, updateBlog);
router.delete("/:id", requireAuth, requireAdmin, deleteBlog);

module.exports = router;
