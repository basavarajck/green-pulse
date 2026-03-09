// Shared form validation utilities

// URL validation helper
export const isValidURL = (string) => {
  try {
    // Accept URLs with or without protocol
    // Matches: example.com, www.example.com, https://example.com/path, forms.gle/xyz, etc.
    const urlPattern = /^(https?:\/\/)?([\w-]+)(\.[\w-]+)+(\/[\w-.~:/?#[\]@!$&'()*+,;=%]*)?$/i;
    return urlPattern.test(string) || string.includes('.'); // Fallback: if it has a dot, consider it valid
  } catch {
    return false;
  }
};

// Validation rules
export const validateField = (value, rules = {}) => {
  const {
    required = false,
    min = 0,
    max = Infinity,
    isURL = false
  } = rules;

  // Check if required
  if (required && (!value || !value.trim())) {
    return 'This field is required';
  }

  // Skip further validation if empty and not required
  if (!value || !value.trim()) {
    return null;
  }

  // Check min length
  if (min > 0 && value.trim().length < min) {
    return `Must be at least ${min} characters long`;
  }

  // Check max length
  if (max < Infinity && value.trim().length > max) {
    return `Must be less than ${max} characters`;
  }

  // Check URL format
  if (isURL && !isValidURL(value.trim())) {
    return 'Please enter a valid URL';
  }

  return null;
};

// Character counter component props
export const getCharCounterClass = (length, min, max) => {
  if (min && length < min) return 'text-red-400';
  if (max && length > max) return 'text-red-400';
  return 'text-gray-400';
};

// Filter out empty optional fields before submission
export const cleanFormData = (data, optionalFields = []) => {
  const cleaned = { ...data };
  optionalFields.forEach(field => {
    if (!cleaned[field] || !cleaned[field].trim || !cleaned[field].trim()) {
      delete cleaned[field];
    }
  });
  return cleaned;
};
