import api from './api';

export async function generatePortfolioContent(portfolioId, description, url) {
  const body = { portfolioId };
  if (description) body.description = description;
  if (url) body.url = url;
  const res = await api.post('/ai/generate', body);
  return res.data.data;
}
