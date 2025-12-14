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

// Email/Password login
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Helper function to generate token and redirect
const generateTokenAndRedirect = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  
  // Redirect to frontend with token
  res.redirect(`${process.env.CLIENT_URL}/login/success?token=${token}`);
};

// --- GOOGLE ---
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  generateTokenAndRedirect
);

// --- GITHUB ---
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/login" }),
  generateTokenAndRedirect
);

module.exports = router;
