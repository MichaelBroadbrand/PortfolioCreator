import api from './api';

export async function getAnalyticsOverview() {
  const res = await api.get('/analytics/overview');
  return res.data.data;
}

export async function getPortfolioAnalytics(portfolioId, days = 30) {
  const res = await api.get(`/analytics/${portfolioId}?days=${days}`);
  return res.data.data;
}

export async function getAggregateViews(days = 30) {
  const res = await api.get(`/analytics/overview/aggregate?days=${days}`);
  return res.data.data;
}
