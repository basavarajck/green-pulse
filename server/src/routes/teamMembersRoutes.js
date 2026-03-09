// server/src/routes/teamMembersRoutes.js
const express = require("express");
const router = express.Router();
const teamMembersController = require("../controllers/teamMembersController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { teamMemberValidation } = require("../middleware/validators");
const teamUpload = require("../config/teamUpload");

// Public
router.get("/", teamMembersController.getAllMembers);

// Admin only with validation
router.post(
  "/",
  requireAuth,
  requireAdmin,
  teamUpload.single("image"),
  teamMemberValidation,
  teamMembersController.addMember
);

router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  teamUpload.single("image"),
  teamMemberValidation,
  teamMembersController.updateMember
);

router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  teamMembersController.deleteMember
);

module.exports = router;