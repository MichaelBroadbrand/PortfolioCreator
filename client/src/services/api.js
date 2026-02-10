import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Clerk auth token to every request
api.interceptors.request.use(async (config) => {
  try {
    // Clerk exposes getToken on the window.__clerk_frontend_api or via useAuth
    // We store the getToken function globally when the app loads
    if (window.__clerkGetToken) {
      const token = await window.__clerkGetToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // Continue without token if Clerk isn't available
  }
  return config;
});

// Response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
