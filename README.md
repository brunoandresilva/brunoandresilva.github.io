# brunoandresilva.github.io

This repository hosts a simple countdown page (`index.html`) and an optional Node.js script to send daily WhatsApp reminders with the number of days remaining until the target date.

## WhatsApp reminders

The `sendWhatsapp.js` script uses the Twilio WhatsApp API. Configure the following environment variables:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM` – your Twilio WhatsApp number (e.g. `whatsapp:+14155238886`)
- `TWILIO_WHATSAPP_TO` – comma separated list of destination numbers (e.g. `+1234567890,+1987654321`)

Install dependencies and run the script:

```bash
npm install
npm start
```

Schedule the script with cron or another scheduler to send the message daily.
