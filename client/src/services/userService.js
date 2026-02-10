import api from './api';

export async function getProfile() {
  const res = await api.get('/users/profile');
  return res.data.data;
}

export async function updateProfile(data) {
  const res = await api.put('/users/profile', data);
  return res.data.data;
}

export async function deleteAccount() {
  const res = await api.delete('/users/account');
  return res.data;
}
