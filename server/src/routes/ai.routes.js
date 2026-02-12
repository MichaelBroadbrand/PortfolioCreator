const express = require('express');
const router = express.Router();
const { attachUser } = require('../middleware/auth');
const { generateContent } = require('../controllers/ai.controller');

router.use(attachUser);

router.post('/generate', generateContent);

module.exports = router;
