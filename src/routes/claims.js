const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validateClaim } = require('../middleware/validation');
const router = express.Router();

// In-memory storage (replace with a database in production)
const claims = [];

// Get all claims
router.get('/', (req, res) => {
  res.json(claims);
});

// Submit new claim
router.post('/', validateClaim, (req, res) => {
  const claim = {
    id: uuidv4(),
    ...req.body,
    status: 'submitted',
    createdAt: new Date().toISOString()
  };
  claims.push(claim);
  res.status(201).json(claim);
});

// Update claim status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const claim = claims.find(c => c.id === req.params.id);
  
  if (!claim) return res.status(404).json({ error: 'Claim not found' });
  
  claim.status = status;
  claim.updatedAt = new Date().toISOString();
  
  res.json(claim);
});

module.exports = router;