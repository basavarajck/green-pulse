const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// Public route
router.get("/", homeController.getHome);

// Admin-only route
router.put("/", requireAuth, requireAdmin, homeController.updateHome);

module.exports = router;
