const { Webhook } = require('svix');

function verifyWebhook(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }

  const svixId = req.headers['svix-id'];
  const svixTimestamp = req.headers['svix-timestamp'];
  const svixSignature = req.headers['svix-signature'];

  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new Error('Missing svix headers');
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  return wh.verify(JSON.stringify(req.body), {
    'svix-id': svixId,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature,
  });
}

module.exports = { verifyWebhook };
