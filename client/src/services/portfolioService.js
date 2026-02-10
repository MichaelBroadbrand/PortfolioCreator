import api from './api';

export async function createPortfolio(templateId, templateIndex, templateName) {
  const res = await api.post('/portfolios', { templateId, templateIndex, templateName });
  return res.data.data;
}

export async function getPortfolios() {
  const res = await api.get('/portfolios');
  return res.data.data;
}

export async function getPortfolio(id) {
  const res = await api.get(`/portfolios/${id}`);
  return res.data.data;
}

export async function updatePortfolio(id, data) {
  const res = await api.put(`/portfolios/${id}`, data);
  return res.data.data;
}

export async function publishPortfolio(id, data) {
  const res = await api.post(`/portfolios/${id}/publish`, data);
  return res.data.data;
}

export async function duplicatePortfolio(id) {
  const res = await api.post(`/portfolios/${id}/duplicate`);
  return res.data.data;
}

export async function deletePortfolio(id) {
  const res = await api.delete(`/portfolios/${id}`);
  return res.data;
}
