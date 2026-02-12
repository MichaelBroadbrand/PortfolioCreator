import api from './api';

export async function generatePortfolioContent(portfolioId, description) {
  const res = await api.post('/ai/generate', { portfolioId, description });
  return res.data.data;
}
