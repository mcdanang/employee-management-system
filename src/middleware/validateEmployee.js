const { body, validationResult } = require("express-validator");

const validateEmployee = [
	// Validate and sanitize fields
	body("name")
		.notEmpty()
		.withMessage("Name is required.")
		.isString()
		.withMessage("Name must be a string."),
	body("position")
		.notEmpty()
		.withMessage("Position is required.")
		.isString()
		.withMessage("Position must be a string."),
	body("salary")
		.notEmpty()
		.withMessage("Salary is required.")
		.isInt({ min: 0 })
		.withMessage("Salary must be a positive integer."),

	// Handle validation result
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateEmployee;
