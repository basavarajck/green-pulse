const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// Public route
router.get("/", teamController.getTeam);

// Admin-only routes
router.post("/", requireAuth, requireAdmin, teamController.addTeamMember);
router.put("/", requireAuth, requireAdmin, teamController.updateTeam);
router.delete("/", requireAuth, requireAdmin, teamController.deleteTeam);

module.exports = router;
