const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateQuote } = require('../middleware/validation');
const { calculateMonthlyPremium } = require('../utils/quotePricing');
const router = express.Router();

// In-memory storage
const quotes = [];

// Generate new quote
router.post('/', validateQuote, (req, res) => {
  const monthlyPremium = calculateMonthlyPremium(req.body);

  const quote = {
    id: uuidv4(),
    ...req.body,
    monthlyPremium,
    status: 'pending',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days validity
  };
  
  quotes.push(quote);
  res.status(201).json(quote);
});

module.exports = router;