const Event = require("../models/Event");
const logger = require("../config/logger");

// GET all events (optimized with lean and proper sorting)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ isUpcoming: -1, date: -1 }) // Upcoming first, then by date
      .lean();
    res.json(events);
  } catch (err) {
    logger.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
};

// ADD new event
exports.addEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    logger.info(`Event created: ${newEvent._id} by ${req.user.id}`);
    res.json({ message: "Event added", event: newEvent });
  } catch (err) {
    logger.error("Error adding event:", err);
    res.status(500).json({ message: "Error adding event" });
  }
};

// UPDATE event
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }
    logger.info(`Event updated: ${updated._id} by ${req.user.id}`);
    res.json({ message: "Event updated", event: updated });
  } catch (err) {
    logger.error("Error updating event:", err);
    res.status(500).json({ message: "Error updating event" });
  }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    logger.info(`Event deleted: ${req.params.id} by ${req.user.id}`);
    res.json({ message: "Event deleted" });
  } catch (err) {
    logger.error("Error deleting event:", err);
    res.status(500).json({ message: "Error deleting event" });
  }
};
