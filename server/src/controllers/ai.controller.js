const { generatePortfolioContent } = require('../services/aiService');
const { extractTextFromUrl } = require('../services/urlScraper');
const Portfolio = require('../models/Portfolio');

async function generateContent(req, res, next) {
  try {
    const { portfolioId, description, url } = req.body;

    if (!description && !url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a description or a URL.',
      });
    }

    if (description) {
      if (typeof description !== 'string' || description.trim().length < 10) {
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
    }

    if (url && typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'URL must be a string.',
      });
    }

    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      userId: req.user._id,
    });

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    // Build text to send to AI
    let contentText = '';

    if (url) {
      const extractedText = await extractTextFromUrl(url.trim());
      contentText += `Content extracted from ${url}:\n${extractedText}`;
    }

    if (description) {
      if (contentText) contentText += '\n\nAdditional user description:\n';
      contentText += description.trim();
    }

    const sectionTypes = portfolio.sections.map((s) => s.type);
    const content = await generatePortfolioContent(contentText, sectionTypes);

    res.json({ success: true, data: content });
  } catch (error) {
    // Surface scraper errors as 400s (user-facing messages)
    if (
      error.message?.includes('URL') ||
      error.message?.includes('fetch') ||
      error.message?.includes('blocked') ||
      error.message?.includes('linkedin')
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
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
