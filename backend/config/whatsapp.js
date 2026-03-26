const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (to, message) => {
    try {
        await client.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:+91${to}`
        });
        return true;
    } catch (error) {
        console.error('WhatsApp Error:', error);
        return false;
    }
};

module.exports = sendWhatsApp;
