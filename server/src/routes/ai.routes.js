const express = require('express');
const router = express.Router();
const { attachUser } = require('../middleware/auth');
// const { requirePlan } = require('../middleware/planCheck');
const { generateContent } = require('../controllers/ai.controller');

router.use(attachUser);

// TODO: Re-enable plan check when billing is live: requirePlan('pro')
router.post('/generate', generateContent);

module.exports = router;
