// Lemon Squeezy configuration (file kept as stripe.js to avoid renaming imports)
// No SDK needed — uses REST API via fetch

const LEMONSQUEEZY_API_URL = 'https://api.lemonsqueezy.com/v1';

async function lemonSqueezyApi(endpoint, options = {}) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) throw new Error('Lemon Squeezy API key not configured');

  const res = await fetch(`${LEMONSQUEEZY_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Lemon Squeezy API error (${res.status}): ${body}`);
  }

  return res.json();
}

module.exports = { lemonSqueezyApi };
