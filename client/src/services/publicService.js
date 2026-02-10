import api from './api';

export async function getPublicPortfolio(slug) {
  const res = await api.get(`/public/${slug}`);
  return res.data.data;
}

export async function submitContactForm(slug, data) {
  const res = await api.post(`/public/${slug}/contact`, data);
  return res.data;
}
