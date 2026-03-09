require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet"); // Security headers
const compression = require("compression"); // Response compression
const morgan = require("morgan"); // HTTP request logger
const logger = require("./config/logger"); // Winston logger

// Verify critical environment variables
if (!process.env.MONGO_URI) {
  logger.error("FATAL: MONGO_URI environment variable is not set!");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  logger.error("FATAL: JWT_SECRET environment variable is not set!");
  process.exit(1);
}

// Initialize app
const app = express();

// Trust proxy - important for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images from different origins
  contentSecurityPolicy: false // Disable CSP for now (can configure later)
}));

// Response compression
app.use(compression());

// HTTP request logging with Morgan + Winston
app.use(morgan('combined', { stream: logger.stream }));

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    console.log('[CORS] Incoming origin:', origin);
    const allowedOrigins = [
      "https://green-pulse-ten.vercel.app",
      "https://greenpulsejssstu.vercel.app",
      "https://greenpulsesjce.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174"
    ];
    // Allow requests with no origin (e.g. server-to-server, Postman)
    // Allow exact matches, and any Vercel preview deployment for the project
    const isAllowed = !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/greenpulsejssstu.*\.vercel\.app$/.test(origin) ||
      /^https:\/\/green-pulse.*\.vercel\.app$/.test(origin) ||
      /^https:\/\/greenpulsesjce.*\.vercel\.app$/.test(origin);
    console.log('[CORS] Origin allowed:', isAllowed);
    callback(null, isAllowed);
  },
  credentials: true
}));
app.use(express.json());

// Serve uploaded files as static assets
// In serverless environments (Vercel), files are stored in /tmp and cleared after function execution
// You should use a cloud storage service (S3, Cloudinary, etc.) for persistent file storage
if (process.env.VERCEL) {
  app.use("/uploads", express.static("/tmp/uploads"));
} else {
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
}

// Initialize Passport (Important: Place before routes)
require("./config/passport");
app.use(passport.initialize());

// Rate limiting middleware 👈 NEW
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: "Too many requests from this IP, please try again later." },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
app.use(limiter);

// Stricter rate limit for auth routes 👈 NEW
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth attempts per windowMs
  message: { message: "Too many login attempts, please try again later." },
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Import routes
const researchRoutes = require('./routes/researchRoutes');
const homeRoutes = require("./routes/homeRoutes");
const teamRoutes = require("./routes/teamRoutes");           // existing (unchanged)
const teamMembersRoutes = require("./routes/teamMembersRoutes"); // 👈 NEW
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// MongoDB connection with caching for serverless and production optimizations
let cachedConnection = null;

async function connectDB() {
  // Return cached connection if available and connected
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }
  
  try {
    const options = {
      maxPoolSize: 10, // Connection pool size for production
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      // Longer timeouts for serverless cold starts
      serverSelectionTimeoutMS: 30000, // 30 seconds for Vercel cold starts
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      w: 'majority'
    };
    
    if (mongoose.connection.readyState === 0) {
      cachedConnection = await mongoose.connect(process.env.MONGO_URI, options);
      logger.info("✅ Connected to MongoDB Atlas with connection pool");
    }
    
    // Log connection events (only attach once)
    if (!mongoose.connection._eventsAttached) {
      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
        cachedConnection = null;
      });
      
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected. Will reconnect on next request...');
        cachedConnection = null;
      });
      
      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
      });
      
      mongoose.connection._eventsAttached = true;
    }
    
    return cachedConnection;
  } catch (err) {
    logger.error("❌ Database connection error:", err);
    cachedConnection = null;
    throw err;
  }
}

// Ensure DB is connected before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    logger.error('Failed to connect to database:', err);
    // More detailed error for debugging
    res.status(500).json({ 
      message: "Database connection failed",
      error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
  }
});

// Register routes (placed after DB middleware so connection is ready)
app.use("/home", homeRoutes);
app.use("/team", teamRoutes);
app.use("/members", teamMembersRoutes);
app.use("/events", eventRoutes);
app.use("/announcements", announcementRoutes);
app.use("/projects", projectRoutes);
app.use("/auth", authLimiter, authRoutes);
app.use("/blogs", blogRoutes);
app.use("/api/research", researchRoutes);

// Health check endpoint
app.get("/health", async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    mongoStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    mongoReadyState: mongoose.connection.readyState, // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    environment: process.env.NODE_ENV || "development",
    hasMongoUri: !!process.env.MONGO_URI,
    memory: process.memoryUsage()
  };
  
  try {
    // Only ping if already connected to avoid hanging
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      healthCheck.dbPing = "success";
    } else {
      healthCheck.message = "MongoDB not connected";
      healthCheck.dbPing = "skipped";
    }
    
    res.status(mongoose.connection.readyState === 1 ? 200 : 503).json(healthCheck);
  } catch (error) {
    healthCheck.message = "Database ping failed";
    healthCheck.error = error.message;
    logger.error("Health check failed:", error);
    res.status(503).json(healthCheck);
  }
});

// API info route
app.get("/", (req, res) => {
  res.json({
    message: "Green Pulse API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/health",
      auth: "/auth",
      blogs: "/blogs",
      events: "/events",
      projects: "/projects",
      announcements: "/announcements",
      team: "/team",
      members: "/members",
      research: "/api/research"
    }
  });
});

// 404 handler
app.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });
  
  // Don't leak error details in production
  const errorResponse = {
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  };
  
  res.status(err.status || 500).json(errorResponse);
});

// Only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  const port = process.env.PORT || 4000;
  const server = app.listen(port, () => {
    logger.info(`🚀 Server running on port ${port}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`Health check: http://localhost:${port}/health`);
  });
  
  // Graceful shutdown
  const gracefulShutdown = async (signal) => {
    logger.info(`\n${signal} signal received: closing HTTP server`);
    
    server.close(async () => {
      logger.info('HTTP server closed');
      
      // Close database connection
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed');
        process.exit(0);
      } catch (err) {
        logger.error('Error during shutdown:', err);
        process.exit(1);
      }
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
      logger.error('Forcing shutdown after timeout');
      process.exit(1);
    }, 10000);
  };
  
  // Handle shutdown signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    gracefulShutdown('uncaughtException');
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('unhandledRejection');
  });
}

// Export for Vercel serverless
module.exports = app;