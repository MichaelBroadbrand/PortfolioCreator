const resend = require('../config/resend');

async function sendWelcomeEmail(email, displayName) {
  if (!resend) {
    console.log(`[Mock Email] Welcome email to ${email} (${displayName})`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'PortfolioBuilder <noreply@portfoliobuilder.com>',
      to: email,
      subject: 'Welcome to PortfolioBuilder!',
      html: `
        <h1>Welcome, ${displayName || 'there'}!</h1>
        <p>Thanks for joining PortfolioBuilder. You're ready to create your first portfolio.</p>
        <p><a href="${process.env.CLIENT_URL}/dashboard">Go to your dashboard</a></p>
      `,
    });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}

async function sendContactFormEmail(toEmail, fromName, fromEmail, subject, message) {
  if (!resend) {
    console.log(`[Mock Email] Contact form: ${fromName} (${fromEmail}) → ${toEmail}: ${subject}`);
    return;
  }

  try {
    await resend.emails.send({
      from: 'PortfolioBuilder <noreply@portfoliobuilder.com>',
      to: toEmail,
      subject: `New message: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
  } catch (error) {
    console.error('Failed to send contact form email:', error);
  }
}

module.exports = { sendWelcomeEmail, sendContactFormEmail };
