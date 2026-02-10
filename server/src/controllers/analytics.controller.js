const Analytics = require('../models/Analytics');
const { getPortfolioStats, getUserTotalViews } = require('../services/analyticsService');
const Portfolio = require('../models/Portfolio');

// GET /api/analytics/overview — get overview stats for all user's portfolios
exports.getOverview = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.user._id, isDeleted: false }).select('_id name').lean();
    const portfolioIds = portfolios.map((p) => p._id);
    const totalViews = await getUserTotalViews(req.user._id, portfolioIds);
    const totalContacts = await Analytics.countDocuments({
      portfolioId: { $in: portfolioIds },
      type: 'contact_form',
    });

    res.json({
      success: true,
      data: {
        totalViews,
        totalContacts,
        portfolioCount: portfolios.length,
        portfolios: portfolios.map((p) => ({ id: p._id, name: p.name })),
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/analytics/:portfolioId — get analytics for a specific portfolio
exports.getPortfolioAnalytics = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const days = parseInt(req.query.days) || 30;

    // Verify ownership
    const portfolio = await Portfolio.findOne({
      _id: portfolioId,
      userId: req.user._id,
    });
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio not found' });
    }

    const stats = await getPortfolioStats(portfolio._id, days);
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

// GET /api/analytics/overview/aggregate — get aggregate dailyViews across all portfolios
exports.getAggregateViews = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const portfolios = await Portfolio.find({ userId: req.user._id, isDeleted: false }).select('_id').lean();
    const portfolioIds = portfolios.map((p) => p._id);

    const dailyViews = await Analytics.aggregate([
      {
        $match: {
          portfolioId: { $in: portfolioIds },
          type: 'view',
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        dailyViews: dailyViews.map((d) => ({ date: d._id, views: d.count })),
      },
    });
  } catch (error) {
    next(error);
  }
};
