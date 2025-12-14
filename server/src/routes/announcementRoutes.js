const express = require("express");
const router = express.Router();
const {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController");

const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/", getAnnouncements);

// Admin-only
router.post("/", requireAuth, requireAdmin, addAnnouncement);
router.put("/", requireAuth, requireAdmin, updateAnnouncement);
router.delete("/:id", requireAuth, requireAdmin, deleteAnnouncement);

module.exports = router;
