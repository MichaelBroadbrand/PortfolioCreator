const express = require('express');
const router = express.Router();
const { attachUser } = require('../middleware/auth');
const {
  createCheckoutSession,
  createPortalSession,
} = require('../controllers/billing.controller');

router.use(attachUser);

router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-portal-session', createPortalSession);

module.exports = router;
