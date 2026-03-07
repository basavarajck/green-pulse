// server/controllers/blogController.js
const Blog = require("../models/Blog");
const logger = require("../config/logger");

// GET all blogs with pagination and optimization
exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Faster, returns plain JS objects
      
    const total = await Blog.countDocuments();
    
    res.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    logger.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// GET single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) {
      logger.warn(`Blog not found: ${req.params.id}`);
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    logger.error("Error fetching blog:", err);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

// ADD new blog
exports.addBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    logger.info(`Blog created: ${newBlog._id} by ${req.user.id}`);
    res.json({ message: "Blog added", blog: newBlog });
  } catch (err) {
    logger.error("Error adding blog:", err);
    res.status(500).json({ message: "Error adding blog" });
  }
};

// UPDATE blog
exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }
    logger.info(`Blog updated: ${updated._id} by ${req.user.id}`);
    res.json({ message: "Blog updated", blog: updated });
  } catch (err) {
    logger.error("Error updating blog:", err);
    res.status(500).json({ message: "Error updating blog" });
  }
};

// DELETE blog
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
};
