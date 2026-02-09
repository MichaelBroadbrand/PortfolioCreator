const User = require('../models/User');
const { verifyWebhook } = require('../config/clerk');
const { sendWelcomeEmail } = require('../services/emailService');

// Handle Clerk webhook events
async function handleWebhook(req, res) {
  try {
    const evt = verifyWebhook(req);
    const eventType = evt.type;

    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const email = email_addresses?.[0]?.email_address;
        const displayName = [first_name, last_name].filter(Boolean).join(' ');

        const user = await User.create({
          clerkId: id,
          email,
          displayName,
          avatarUrl: image_url || '',
        });

        // Send welcome email
        await sendWelcomeEmail(email, displayName);

        console.log(`User created: ${email}`);
        break;
      }

      case 'user.updated': {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;
        const email = email_addresses?.[0]?.email_address;
        const displayName = [first_name, last_name].filter(Boolean).join(' ');

        await User.findOneAndUpdate(
          { clerkId: id },
          { email, displayName, avatarUrl: image_url || '' }
        );

        console.log(`User updated: ${email}`);
        break;
      }

      case 'user.deleted': {
        const { id } = evt.data;
        await User.findOneAndDelete({ clerkId: id });
        console.log(`User deleted: ${id}`);
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = { handleWebhook };
