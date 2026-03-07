// server/src/controllers/teamMembersController.js
const TeamMember = require("../models/TeamMember");
const logger = require("../config/logger");
const fs = require("fs");
const path = require("path");

// GET /members - public
exports.getAllMembers = async (req, res) => {
  try {
    const members = await TeamMember.find()
      .sort({ createdAt: 1 })
      .lean();
    res.json(members);
  } catch (err) {
    logger.error("Error fetching team members:", err);
    res.status(500).json({ message: "Error fetching team members" });
  }
};

// POST /members - admin only
exports.addMember = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { name, role, email, designation } = req.body;
    if (!name || !role || !email) {
      return res.status(400).json({ message: "Name, role, and email are required" });
    }

    const imagePath = `uploads/team/${req.file.filename}`;

    const member = new TeamMember({ name, role, email, designation, image: imagePath });
    await member.save();

    logger.info(`Team member added: ${member._id} by ${req.user.id}`);
    res.status(201).json({ message: "Team member added", member });
  } catch (err) {
    logger.error("Error adding team member:", err);
    res.status(500).json({ message: "Error adding team member" });
  }
};

// PUT /members/:id - admin only
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, email, designation } = req.body;

    const existing = await TeamMember.findById(id);
    if (!existing) return res.status(404).json({ message: "Member not found" });

    // If new image uploaded, delete old one
    if (req.file) {
      const oldImagePath = path.join(__dirname, "../../", existing.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      existing.image = `uploads/team/${req.file.filename}`;
    }

    if (name) existing.name = name;
    if (role) existing.role = role;
    if (email) existing.email = email;
    if (designation !== undefined) existing.designation = designation;

    await existing.save();

    logger.info(`Team member updated: ${id} by ${req.user.id}`);
    res.json({ message: "Team member updated", member: existing });
  } catch (err) {
    logger.error("Error updating team member:", err);
    res.status(500).json({ message: "Error updating team member" });
  }
};

// DELETE /members/:id - admin only
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await TeamMember.findById(id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    // Delete image file from disk
    const imagePath = path.join(__dirname, "../../", member.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await TeamMember.findByIdAndDelete(id);

    logger.info(`Team member deleted: ${id} by ${req.user.id}`);
    res.json({ message: "Team member deleted" });
  } catch (err) {
    logger.error("Error deleting team member:", err);
    res.status(500).json({ message: "Error deleting team member" });
  }
};