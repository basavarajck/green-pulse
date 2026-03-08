// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

// // Email/Password login
// router.post("/signup", authController.signup);
// router.post("/login", authController.login);

// // GOOGLE LOGIN ROUTE
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // GOOGLE CALLBACK ROUTE
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     // Create JWT for frontend after Google login success
//     const token = jwt.sign(
//       { id: req.user._id, role: req.user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Google login successful",
//       token,
//       role: req.user.role
//     });
//   }
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { signupValidation, loginValidation } = require("../middleware/validators");

// Email/Password login with validation
router.post("/signup", signupValidation, authController.signup);
router.post("/login", loginValidation, authController.login);

// Helper function to generate token and redirect
const generateTokenAndRedirect = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  
  // Get client URL with fallback
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  
  // Redirect to frontend with token
  res.redirect(`${clientUrl}/login/success?token=${token}`);
};

// --- GOOGLE ---
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      
      if (err) {
        // Redirect to frontend with error message
        const errorMessage = encodeURIComponent(err.message || "Google authentication failed");
        return res.redirect(`${clientUrl}/login?error=${errorMessage}`);
      }
      
      if (!user) {
        const errorMessage = encodeURIComponent("Authentication failed. Please try again.");
        return res.redirect(`${clientUrl}/login?error=${errorMessage}`);
      }
      
      // User authenticated successfully
      req.user = user;
      next();
    })(req, res, next);
  },
  generateTokenAndRedirect
);

// --- GITHUB ---
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  (req, res, next) => {
    passport.authenticate("github", { session: false }, (err, user, info) => {
      const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
      
      if (err) {
        // Redirect to frontend with error message
        const errorMessage = encodeURIComponent(err.message || "GitHub authentication failed");
        return res.redirect(`${clientUrl}/login?error=${errorMessage}`);
      }
      
      if (!user) {
        const errorMessage = encodeURIComponent("Authentication failed. Please try again.");
        return res.redirect(`${clientUrl}/login?error=${errorMessage}`);
      }
      
      // User authenticated successfully
      req.user = user;
      next();
    })(req, res, next);
  },
  generateTokenAndRedirect
);

module.exports = router;
