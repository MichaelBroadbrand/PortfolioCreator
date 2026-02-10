const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/auth.controller');

// Clerk webhook — receives user.created, user.updated, user.deleted events
router.post('/webhook', handleWebhook);

module.exports = router;
