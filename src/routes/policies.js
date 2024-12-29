const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { validatePolicy } = require('../middleware/validation');
const router = express.Router();

// In-memory storage (replace with a database in production)
const policies = [];

// Get all policies
router.get('/', (req, res) => {
  res.json(policies);
});

// Get policy by ID
router.get('/:id', (req, res) => {
  const policy = policies.find(p => p.id === req.params.id);
  if (!policy) return res.status(404).json({ error: 'Policy not found' });
  res.json(policy);
});

// Create new policy
router.post('/', validatePolicy, (req, res) => {
  const policy = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  policies.push(policy);
  res.status(201).json(policy);
});

// Update policy
router.put('/:id', validatePolicy, (req, res) => {
  const index = policies.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Policy not found' });
  
  policies[index] = {
    ...policies[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(policies[index]);
});

module.exports = router;