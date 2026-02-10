const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const { sendContactFormEmail } = require('../services/emailService');
const { trackEvent } = require('../services/analyticsService');

// GET /api/public/:slug — fetch published portfolio by slug
exports.getPublicPortfolio = async (req, res, next) => {
  try {
    const { slug } = req.params;

    // Try database first
    let portfolio = null;
    try {
      portfolio = await Portfolio.findOne({
        slug,
        status: 'published',
        isDeleted: false,
      }).lean();
    } catch {
      // DB not available
    }

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    // Get owner info
    let owner = null;
    try {
      owner = await User.findById(portfolio.userId).select('displayName avatarUrl').lean();
    } catch {
      // ignore
    }

    // Track view (fire and forget)
    trackEvent(portfolio._id, 'view', {
      referrer: req.get('referer'),
      userAgent: req.get('user-agent'),
    });

    res.json({
      success: true,
      data: {
        ...portfolio,
        owner: owner || { displayName: 'Anonymous' },
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/public/:slug/contact — submit contact form
exports.submitContactForm = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    // Find portfolio and owner
    let portfolio = null;
    try {
      portfolio = await Portfolio.findOne({
        slug,
        status: 'published',
        isDeleted: false,
      }).lean();
    } catch {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    // Find owner email
    let owner = null;
    try {
      owner = await User.findById(portfolio.userId).lean();
    } catch {
      // ignore
    }

    const ownerEmail = owner?.email;
    if (ownerEmail) {
      await sendContactFormEmail(ownerEmail, name, email, portfolio.name, message);
    }

    // Track contact form submission as analytics event
    trackEvent(portfolio._id, 'contact_form', {
      senderName: name,
      senderEmail: email,
    });

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};
