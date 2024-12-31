const Joi = require('joi');

// Define validation schema
const adminValidationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: true } }) // Ensures email format
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'any.required': 'Password is required',
        }),
});

// Function to validate input
const validateAdmin = (data) => {
    return adminValidationSchema.validate(data, { abortEarly: false });
};

module.exports = validateAdmin;
