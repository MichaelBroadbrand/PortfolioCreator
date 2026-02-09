const Analytics = require('../models/Analytics');

async function trackEvent(portfolioId, type = 'view', metadata = {}) {
  try {
    await Analytics.create({
      portfolioId,
      type,
      date: new Date(),
      metadata,
    });
  } catch (err) {
    console.error('Failed to track analytics event:', err.message);
  }
}

async function getPortfolioStats(portfolioId, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const [totalViews, dailyViews, totalContacts] = await Promise.all([
      Analytics.countDocuments({
        portfolioId,
        type: 'view',
        date: { $gte: startDate },
      }),
      Analytics.aggregate([
        {
          $match: {
            portfolioId: portfolioId,
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
      ]),
      Analytics.countDocuments({
        portfolioId,
        type: 'contact_form',
        date: { $gte: startDate },
      }),
    ]);

    return {
      totalViews,
      totalContacts,
      dailyViews: dailyViews.map((d) => ({ date: d._id, views: d.count })),
    };
  } catch {
    return { totalViews: 0, totalContacts: 0, dailyViews: [] };
  }
}

async function getUserTotalViews(userId, portfolioIds) {
  try {
    const count = await Analytics.countDocuments({
      portfolioId: { $in: portfolioIds },
      type: 'view',
    });
    return count;
  } catch {
    return 0;
  }
}

module.exports = { trackEvent, getPortfolioStats, getUserTotalViews };
