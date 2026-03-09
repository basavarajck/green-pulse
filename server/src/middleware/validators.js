const { body, validationResult } = require('express-validator');

// Validation middleware to check for errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation error', 
      errors: errors.array() 
    });
  }
  next();
};

// Signup validation rules
exports.signupValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  
  validate
];

// Login validation rules
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validate
];

// Event validation rules
exports.eventValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Event title is required. Please enter a descriptive title for your event')
    .isLength({ min: 3, max: 200 }).withMessage('Event title must be between 3 and 200 characters')
    .escape(), // Sanitize against XSS
  
  body('description')
    .trim()
    .notEmpty().withMessage('Event description is required. Please describe what the event is about')
    .isLength({ min: 10, max: 2000 }).withMessage('Event description must be between 10 and 2000 characters'),
  
  body('date')
    .notEmpty().withMessage('Event date is required. Please select a date for the event')
    .isISO8601().withMessage('Invalid date format. Please select a valid date from the calendar'),
  
  body('image')
    .optional({ checkFalsy: true }) // Skip validation if empty string
    .trim()
    .custom((value) => {
      if (!value) return true; // If empty, it's valid (optional field)
      // Simple check: must contain at least one dot and look like a URL
      const urlPattern = /^(https?:\/\/)?([\w\-]+)(\.[\w\-]+)+(\/[\w\-\.~:/?#[\]@!$&'()*+,;=%]*)?$/i;
      if (urlPattern.test(value) || value.includes('.')) return true;
      throw new Error('Please enter a valid image URL (e.g., https://example.com/poster.jpg or leave empty)');
    }),
  
  body('link')
    .optional({ checkFalsy: true }) // Skip validation if empty string
    .trim()
    .custom((value) => {
      if (!value) return true; // If empty, it's valid (optional field)
      // Accept any URL-like string with a dot (forms.com, forms.gle/xyz, etc.)
      const urlPattern = /^(https?:\/\/)?([\w\-]+)(\.[\w\-]+)+(\/[\w\-\.~:/?#[\]@!$&'()*+,;=%]*)?$/i;
      if (urlPattern.test(value) || value.includes('.')) return true;
      throw new Error('Please enter a valid registration link (e.g., https://forms.gle/xyz, forms.com, or example.com/register)');
    }),
  
  body('isUpcoming')
    .optional()
    .isBoolean().withMessage('Invalid upcoming status'),
  
  validate
];

// Blog validation rules
exports.blogValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters')
    .escape(),
  
  body('author')
    .trim()
    .notEmpty().withMessage('Author is required')
    .isLength({ max: 100 }).withMessage('Author name must be less than 100 characters')
    .escape(),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 50000 }).withMessage('Content must be less than 50000 characters'),
  
  body('summary')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('Summary must be less than 500 characters'),
  
  body('coverImage')
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ require_protocol: false }).withMessage('Please enter a valid image URL (e.g., https://example.com/blog-cover.jpg) or leave empty'),
  
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags.length > 10) throw new Error('Maximum 10 tags allowed');
      return true;
    }),
  
  validate
];

// Project validation rules
exports.projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters')
    .escape(),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  
  body('image')
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ require_protocol: false }).withMessage('Please enter a valid project image URL (e.g., https://example.com/project.png) or leave empty'),
  
  body('github')
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ require_protocol: false }).withMessage('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo) or leave empty'),
  
  body('live')
    .optional({ checkFalsy: true })
    .trim()
    .isURL({ require_protocol: false }).withMessage('Please enter a valid live demo URL (e.g., https://your-project.com) or leave empty'),
  
  body('stack')
    .optional()
    .isArray().withMessage('Stack must be an array')
    .custom((stack) => {
      if (stack.length > 20) throw new Error('Maximum 20 technologies allowed');
      return true;
    }),
  
  validate
];

// Announcement validation rules
exports.announcementValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters')
    .escape(),
  
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 5000 }).withMessage('Content must be less than 5000 characters'),
  
  body('date')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Must be a valid date'),
  
  validate
];

// Team member validation rules
exports.teamMemberValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters')
    .escape(),
  
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isLength({ max: 100 }).withMessage('Role must be less than 100 characters')
    .escape(),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email'),
  
  body('designation')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('Designation must be less than 100 characters')
    .escape(),
  
  validate
];
