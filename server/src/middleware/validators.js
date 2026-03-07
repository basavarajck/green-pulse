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
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be less than 200 characters')
    .escape(), // Sanitize against XSS
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Must be a valid date'),
  
  body('image')
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL'),
  
  body('link')
    .optional()
    .trim()
    .isURL().withMessage('Link must be a valid URL'),
  
  body('isUpcoming')
    .optional()
    .isBoolean().withMessage('isUpcoming must be a boolean'),
  
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
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Summary must be less than 500 characters'),
  
  body('image')
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL'),
  
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
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL'),
  
  body('github')
    .optional()
    .trim()
    .isURL().withMessage('GitHub link must be a valid URL'),
  
  body('live')
    .optional()
    .trim()
    .isURL().withMessage('Live demo link must be a valid URL'),
  
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
    .optional()
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
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Designation must be less than 100 characters')
    .escape(),
  
  validate
];
