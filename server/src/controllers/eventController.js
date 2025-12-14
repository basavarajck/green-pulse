const Event = require("../models/Event");

// GET all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

// ADD new event
exports.addEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json({ message: "Event added", event: newEvent });
  } catch (err) {
    res.status(500).json({ message: "Error adding event" });
  }
};

// UPDATE event
exports.updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.json({ message: "Event updated", event: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating event" });
  }
};

// DELETE event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event" });
  }
};
