const express = require("express");
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent } = require("../controllers/eventController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { eventValidation } = require("../middleware/validators");

router.get("/", getEvents);

// Admin-only actions with validation
router.post("/", requireAuth, requireAdmin, eventValidation, addEvent);
router.put("/:id", requireAuth, requireAdmin, eventValidation, updateEvent);
router.delete("/:id", requireAuth, requireAdmin, deleteEvent);

module.exports = router;
