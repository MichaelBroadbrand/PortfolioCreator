const { Resend } = require('resend');

let resend = null;

if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('your_resend')) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

module.exports = resend;
