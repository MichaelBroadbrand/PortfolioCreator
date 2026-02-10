const express = require('express');
const router = express.Router();
const { listTemplates, getTemplate } = require('../controllers/template.controller');

// Public routes — no auth required
router.get('/', listTemplates);
router.get('/:id', getTemplate);

module.exports = router;
