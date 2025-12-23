// server/controllers/blogController.js
const Blog = require("../models/Blog");

// GET all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// GET single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
};

// ADD new blog
exports.addBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.json({ message: "Blog added", blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: "Error adding blog" });
  }
};

// UPDATE blog
exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.json({ message: "Blog updated", blog: updated });
  } catch (err) {
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
