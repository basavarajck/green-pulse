const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");
const { projectValidation } = require("../middleware/validators");

// Public
router.get("/", projectController.getProjects);

// Admin-only with validation
router.post("/", requireAuth, requireAdmin, projectValidation, projectController.addProject);
router.put("/", requireAuth, requireAdmin, projectValidation, projectController.updateProject);
router.delete("/:id", requireAuth, requireAdmin, projectController.deleteProject);

module.exports = router;
