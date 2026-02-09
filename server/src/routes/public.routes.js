const express = require('express');
const router = express.Router();
const { publicLimiter } = require('../middleware/rateLimiter');
const { getPublicPortfolio, submitContactForm } = require('../controllers/public.controller');

router.get('/:slug', getPublicPortfolio);
router.post('/:slug/contact', publicLimiter, submitContactForm);

module.exports = router;
