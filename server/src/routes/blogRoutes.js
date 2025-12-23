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

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin-only routes
router.post("/", requireAuth, requireAdmin, addBlog);
router.put("/", requireAuth, requireAdmin, updateBlog);
router.delete("/:id", requireAuth, requireAdmin, deleteBlog);

module.exports = router;
