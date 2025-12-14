const Project = require("../models/Project");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// ADD new project
exports.addProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json({ message: "Project added", project });
  } catch (err) {
    res.status(500).json({ message: "Error adding project" });
  }
};

// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.json({ message: "Project updated", project: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating project" });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project" });
  }
};
