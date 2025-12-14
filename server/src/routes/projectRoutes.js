const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/", projectController.getProjects);

// Admin-only
router.post("/", requireAuth, requireAdmin, projectController.addProject);
router.put("/", requireAuth, requireAdmin, projectController.updateProject);
router.delete("/:id", requireAuth, requireAdmin, projectController.deleteProject);

module.exports = router;
