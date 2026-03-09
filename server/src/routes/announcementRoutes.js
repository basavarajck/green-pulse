const express = require("express");
const router = express.Router();
const {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");

const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { announcementValidation } = require("../middleware/validators");

// Public
router.get("/", getAnnouncements);

// Admin-only with validation
router.post("/", requireAuth, requireAdmin, announcementValidation, addAnnouncement);
router.put("/:id", requireAuth, requireAdmin, announcementValidation, updateAnnouncement);
router.delete("/:id", requireAuth, requireAdmin, deleteAnnouncement);

module.exports = router;
