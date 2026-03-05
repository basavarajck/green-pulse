// server/src/routes/teamMembersRoutes.js
const express = require("express");
const router = express.Router();
const teamMembersController = require("../controllers/teamMembersController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const teamUpload = require("../config/teamUpload");

// Public
router.get("/", teamMembersController.getAllMembers);

// Admin only
router.post(
  "/",
  requireAuth,
  requireAdmin,
  teamUpload.single("image"),
  teamMembersController.addMember
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  teamUpload.single("image"),
  teamMembersController.updateMember
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  teamMembersController.deleteMember
);

module.exports = router;