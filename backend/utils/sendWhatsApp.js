// Temporary version — logs only
const sendWhatsAppMessage = async (phone, message) => {
    console.log(`📱 [WhatsApp] To: +91${phone}`);
    console.log(`📝 Message: ${message}`);
    console.log(`💡 Tip: Add Twilio credentials to .env to enable real WhatsApp`);
    return true;
};

module.exports = sendWhatsAppMessage;
