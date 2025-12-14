const Announcement = require("../models/Announcement");

// GET all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const list = await Announcement.find().sort({ _id: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching announcements" });
  }
};

// ADD announcement
exports.addAnnouncement = async (req, res) => {
  try {
    const newA = new Announcement(req.body);
    await newA.save();
    res.json({ message: "Announcement added", announcement: newA });
  } catch (err) {
    res.status(500).json({ message: "Error adding announcement" });
  }
};

// UPDATE announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    res.json({ message: "Announcement updated", announcement: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating announcement" });
  }
};

// DELETE announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting announcement" });
  }
};
