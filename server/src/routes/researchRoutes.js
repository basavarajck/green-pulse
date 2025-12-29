// routes/researchRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllResearch,
  getResearchByDomain,
  upsertResearch,
  addProject,
  updateProject,
  deleteProject,
  addAchievement,
  deleteResearch
} = require('../controllers/researchController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllResearch);
router.get('/:domain', getResearchByDomain);

// Admin routes - Research domain management
router.post('/', requireAuth, requireAdmin, upsertResearch);
router.delete('/:domain', requireAuth, requireAdmin, deleteResearch);

// Admin routes - Project management
router.post('/:domain/projects', requireAuth, requireAdmin, addProject);
router.put('/:domain/projects/:projectId', requireAuth, requireAdmin, updateProject);
router.delete('/:domain/projects/:projectId', requireAuth, requireAdmin, deleteProject);

// Admin routes - Achievement management
router.post('/:domain/achievements', requireAuth, requireAdmin, addAchievement);

module.exports = router;
