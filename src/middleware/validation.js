const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validatePolicy = [
  body('businessName').notEmpty().trim(),
  body('coverageType').isIn(['liability', 'property', 'workers-comp', 'cyber']),
  body('coverageAmount').isNumeric(),
  body('startDate').isISO8601(),
  body('endDate').isISO8601(),
  handleValidation
];

const validateQuote = [
  body('businessName').notEmpty().trim(),
  body('coverageType').isIn(['liability', 'property', 'workers-comp', 'cyber']),
  body('coverageAmount').isNumeric(),
  body('businessDetails').isObject(),
  handleValidation
];

const validateClaim = [
  body('policyId').notEmpty(),
  body('incidentDate').isISO8601(),
  body('description').notEmpty().trim(),
  body('claimAmount').isNumeric(),
  handleValidation
];

module.exports = {
  validatePolicy,
  validateQuote,
  validateClaim
};