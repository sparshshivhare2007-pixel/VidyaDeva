// WhatsApp Service - Temporary Version (Without Twilio)
// Jab Twilio setup ho jayega toh replace kar dena

const sendWhatsAppMessage = async (phone, message) => {
    // Console pe message dikha dega — actual WhatsApp nahi bhejega
    console.log(`📱 [WhatsApp] To: +91${phone}`);
    console.log(`📝 Message: ${message}`);
    console.log(`💡 Tip: Add Twilio credentials to .env to enable real WhatsApp messages`);
    return true;
};

module.exports = sendWhatsAppMessage;
