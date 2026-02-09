const express = require('express');
const router = express.Router();
const { attachUser } = require('../middleware/auth');
const { getOverview, getPortfolioAnalytics, getAggregateViews } = require('../controllers/analytics.controller');

router.get('/overview', attachUser, getOverview);
router.get('/overview/aggregate', attachUser, getAggregateViews);
router.get('/:portfolioId', attachUser, getPortfolioAnalytics);

module.exports = router;
