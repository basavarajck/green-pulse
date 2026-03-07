const Announcement = require("../models/Announcement");
const logger = require("../config/logger");

// GET all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const list = await Announcement.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(list);
  } catch (err) {
    logger.error("Error fetching announcements:", err);
    res.status(500).json({ message: "Error fetching announcements" });
  }
};

// ADD announcement
exports.addAnnouncement = async (req, res) => {
  try {
    const newA = new Announcement(req.body);
    await newA.save();
    logger.info(`Announcement created: ${newA._id} by ${req.user.id}`);
    res.json({ message: "Announcement added", announcement: newA });
  } catch (err) {
    logger.error("Error adding announcement:", err);
    res.status(500).json({ message: "Error adding announcement" });
  }
};

// UPDATE announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    logger.info(`Announcement updated: ${updated._id} by ${req.user.id}`);
    res.json({ message: "Announcement updated", announcement: updated });
  } catch (err) {
    logger.error("Error updating announcement:", err);
    res.status(500).json({ message: "Error updating announcement" });
  }
};

// DELETE announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    logger.info(`Announcement deleted: ${req.params.id} by ${req.user.id}`);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    logger.error("Error deleting announcement:", err);
    res.status(500).json({ message: "Error deleting announcement" });
  }
};
