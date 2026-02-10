const express = require('express');
const router = express.Router();
const { attachUser } = require('../middleware/auth');
const {
  createFromTemplate,
  listPortfolios,
  getPortfolio,
  updatePortfolio,
  togglePublish,
  duplicatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controller');

// All routes require authentication — attachUser checks auth via getAuth() and returns 401 JSON if missing
router.use(attachUser);

router.get('/', listPortfolios);
router.post('/', createFromTemplate);
router.get('/:id', getPortfolio);
router.put('/:id', updatePortfolio);
router.post('/:id/publish', togglePublish);
router.post('/:id/duplicate', duplicatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;
