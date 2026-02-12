const { generatePortfolioContent } = require('../services/aiService');
const Portfolio = require('../models/Portfolio');

async function generateContent(req, res, next) {
  try {
    const { portfolioId, description } = req.body;

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a description of at least 10 characters.',
      });
    }

    if (description.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Description must be under 5000 characters.',
      });
    }

    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      userId: req.user._id,
    });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    const sectionTypes = portfolio.sections.map((s) => s.type);
    const content = await generatePortfolioContent(description.trim(), sectionTypes);

    res.json({ success: true, data: content });
  } catch (error) {
    if (error.message?.includes('API_KEY') || error.message?.includes('PERMISSION_DENIED')) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not configured. Please add a valid GEMINI_API_KEY.',
      });
    }
    next(error);
  }
}

module.exports = { generateContent };
