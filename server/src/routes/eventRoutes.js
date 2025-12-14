const express = require("express");
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent } = require("../controllers/eventController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

router.get("/", getEvents);

// Admin-only actions
router.post("/", requireAuth, requireAdmin, addEvent);
router.put("/", requireAuth, requireAdmin, updateEvent);
router.delete("/:id", requireAuth, requireAdmin, deleteEvent);

module.exports = router;
