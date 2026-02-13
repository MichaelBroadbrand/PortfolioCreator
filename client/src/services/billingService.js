import api from './api';

export async function createCheckoutSession() {
  const res = await api.post('/billing/create-checkout-session');
  return res.data.data;
}

export async function createPortalSession() {
  const res = await api.post('/billing/create-portal-session');
  return res.data.data;
}
