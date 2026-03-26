const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (phone, message) => {
    try {
        await client.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:+91${phone}`
        });
        console.log(`✅ WhatsApp message sent to ${phone}`);
        return true;
    } catch (error) {
        console.error('❌ WhatsApp Error:', error);
        return false;
    }
};

module.exports = sendWhatsAppMessage;
