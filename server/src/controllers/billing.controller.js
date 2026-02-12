const crypto = require('crypto');
const { lemonSqueezyApi } = require('../config/stripe');
const User = require('../models/User');

async function createCheckoutSession(req, res, next) {
  try {
    if (!process.env.LEMONSQUEEZY_API_KEY) {
      return res.status(503).json({ success: false, message: 'Billing is not configured.' });
    }

    const result = await lemonSqueezyApi('/checkouts', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: req.user.email,
              custom: {
                user_id: req.user._id.toString(),
              },
            },
            checkout_options: {
              embed: false,
            },
            product_options: {
              redirect_url: `${process.env.CLIENT_URL}/checkout/success`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: process.env.LEMONSQUEEZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: process.env.LEMONSQUEEZY_VARIANT_ID,
              },
            },
          },
        },
      }),
    });

    const checkoutUrl = result.data.attributes.url;
    res.json({ success: true, data: { url: checkoutUrl } });
  } catch (error) {
    next(error);
  }
}

async function createPortalSession(req, res, next) {
  try {
    if (!req.user.customerPortalUrl) {
      return res.status(400).json({ success: false, message: 'No billing account found.' });
    }

    res.json({ success: true, data: { url: req.user.customerPortalUrl } });
  } catch (error) {
    next(error);
  }
}

function verifyWebhookSignature(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

async function handleWebhook(req, res) {
  if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    return res.status(503).json({ success: false, message: 'Billing is not configured.' });
  }

  const signature = req.headers['x-signature'];
  if (!signature) {
    return res.status(400).json({ success: false, message: 'Missing signature.' });
  }

  const rawBody = typeof req.body === 'string' ? req.body : req.body.toString();

  try {
    const valid = verifyWebhookSignature(rawBody, signature, process.env.LEMONSQUEEZY_WEBHOOK_SECRET);
    if (!valid) {
      console.error('[LS Webhook] Signature verification failed');
      return res.status(400).json({ success: false, message: 'Invalid signature.' });
    }
  } catch (err) {
    console.error('[LS Webhook] Signature error:', err.message);
    return res.status(400).json({ success: false, message: 'Signature verification failed.' });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta?.event_name;
  const customData = event.meta?.custom_data;
  const subscriptionData = event.data?.attributes;

  console.log('[LS Webhook] Event:', eventName);

  try {
    switch (eventName) {
      case 'subscription_created': {
        const userId = customData?.user_id;
        if (!userId) {
          console.error('[LS Webhook] No user_id in custom_data');
          break;
        }

        await User.findByIdAndUpdate(userId, {
          plan: 'pro',
          lsCustomerId: String(subscriptionData.customer_id),
          lsSubscriptionId: String(event.data.id),
          subscriptionStatus: subscriptionData.status,
          customerPortalUrl: subscriptionData.urls?.customer_portal || null,
        });

        console.log('[LS Webhook] subscription_created — user upgraded to pro');
        break;
      }

      case 'subscription_updated': {
        const subId = String(event.data.id);
        const status = subscriptionData.status;
        const update = {
          subscriptionStatus: status,
          customerPortalUrl: subscriptionData.urls?.customer_portal || null,
        };

        if (status === 'active' || status === 'on_trial') {
          update.plan = 'pro';
        } else if (status === 'cancelled' || status === 'expired') {
          update.plan = 'free';
        }
        // past_due / paused → keep plan as-is (grace period)

        await User.findOneAndUpdate({ lsSubscriptionId: subId }, update);

        console.log('[LS Webhook] subscription_updated — status:', status);
        break;
      }

      case 'subscription_cancelled': {
        const subId = String(event.data.id);

        await User.findOneAndUpdate(
          { lsSubscriptionId: subId },
          {
            subscriptionStatus: 'cancelled',
            // Don't immediately downgrade — user keeps access until period ends
            // The subscription_expired event will handle final downgrade
          }
        );

        console.log('[LS Webhook] subscription_cancelled — will expire at period end');
        break;
      }

      case 'subscription_expired': {
        const subId = String(event.data.id);

        await User.findOneAndUpdate(
          { lsSubscriptionId: subId },
          {
            plan: 'free',
            subscriptionStatus: 'expired',
            lsSubscriptionId: null,
          }
        );

        console.log('[LS Webhook] subscription_expired — user downgraded to free');
        break;
      }

      default:
        console.log(`[LS Webhook] Unhandled event: ${eventName}`);
    }
  } catch (err) {
    console.error('[LS Webhook] Error handling event:', err.message);
  }

  res.status(200).json({ received: true });
}

module.exports = {
  createCheckoutSession,
  createPortalSession,
  handleWebhook,
};
