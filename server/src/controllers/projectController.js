const Project = require("../models/Project");
const logger = require("../config/logger");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(projects);
  } catch (err) {
    logger.error("Error fetching projects:", err);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// ADD new project
exports.addProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    logger.info(`Project created: ${project._id} by ${req.user.id}`);
    res.json({ message: "Project added", project });
  } catch (err) {
    logger.error("Error adding project:", err);
    res.status(500).json({ message: "Error adding project" });
  }
};

// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }
    logger.info(`Project updated: ${updated._id} by ${req.user.id}`);
    res.json({ message: "Project updated", project: updated });
  } catch (err) {
    logger.error("Error updating project:", err);
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    logger.info(`Project deleted: ${req.params.id} by ${req.user.id}`);
    res.json({ message: "Project deleted" });
  } catch (err) {
    logger.error("Error deleting project:", err);
    res.status(500).json({ message: "Error deleting project" });
  }
};
