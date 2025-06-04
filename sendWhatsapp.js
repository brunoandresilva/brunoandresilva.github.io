const twilio = require('twilio');

/**
 * Calculates the number of full days between now and the target date.
 * @param {Date} targetDate The date to count down to.
 * @returns {number} Number of days remaining.
 */
function daysUntil(targetDate) {
  const now = new Date();
  const diffMs = targetDate - now;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

// Target date must match the one in index.html
const targetDate = new Date(2025, 7, 24, 6, 0, 0); // August 24, 2025 06:00

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. 'whatsapp:+14155238886'
const recipients = process.env.TWILIO_WHATSAPP_TO; // comma separated numbers

if (!accountSid || !authToken || !from || !recipients) {
  console.error('Missing required environment variables.');
  console.error('Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM and TWILIO_WHATSAPP_TO');
  process.exit(1);
}

const client = twilio(accountSid, authToken);
const toNumbers = recipients.split(',').map(s => s.trim()).filter(Boolean);

const days = daysUntil(targetDate);
const messageBody = `Only ${days} day${days === 1 ? '' : 's'} left until the big day!`;

(async () => {
  for (const to of toNumbers) {
    try {
      const message = await client.messages.create({
        from,
        to: `whatsapp:${to}`,
        body: messageBody,
      });
      console.log('Message sent to', to, 'SID:', message.sid);
    } catch (err) {
      console.error('Failed to send message to', to, err.message);
    }
  }
})();
