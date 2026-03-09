const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const adminEmails = require("./adminEmails"); // Assuming you have this config

const handleSocialAuth = async (accessToken, refreshToken, profile, done) => {
  try {
    let user;
    
    // Get email from profile - handle cases where email might not be available
    let email = null;
    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails[0].value;
    }
    
    // For GitHub, if no email in profile.emails, check _json
    if (!email && profile.provider === "github" && profile._json && profile._json.email) {
      email = profile._json.email;
    }
    
    // If still no email, return error - we require email for user accounts
    if (!email) {
      return done(new Error(`No email available from ${profile.provider}. Please ensure your email is public and verified on ${profile.provider}.`), null);
    }

    // 1. Check if user exists by social ID
    if (profile.provider === "google") {
      user = await User.findOne({ googleId: profile.id });
    } else if (profile.provider === "github") {
      user = await User.findOne({ githubId: profile.id });
    }

    // 2. If no user by ID, check by Email (to link accounts)
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        // Link the social ID to existing account
        if (profile.provider === "google") user.googleId = profile.id;
        if (profile.provider === "github") user.githubId = profile.id;
        await user.save();
      }
    }

    // 3. If still no user, create a new one
    if (!user) {
      const role = adminEmails.includes(email) ? "admin" : "user";
      user = await User.create({
        name: profile.displayName || profile.username || "User",
        email: email,
        googleId: profile.provider === "google" ? profile.id : undefined,
        githubId: profile.provider === "github" ? profile.id : undefined,
        role: role
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL || "http://localhost:4000"}/auth/google/callback`,
    },
    handleSocialAuth
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL || "http://localhost:4000"}/auth/github/callback`,
      scope: ["user:email"], // Important for GitHub to get email
    },
    handleSocialAuth
  )
);

module.exports = passport;
