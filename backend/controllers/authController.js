const User = require('../models/User');
const generateOTP = require('../utils/generateOTP');
const sendWhatsAppMessage = require('../utils/sendWhatsApp');

// Send OTP
const sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        
        if (!phone || phone.length !== 10) {
            return res.status(400).json({ message: 'Valid 10-digit mobile number required' });
        }
        
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        
        let user = await User.findOne({ phone });
        
        if (user) {
            user.otp = { code: otp, expiresAt };
            await user.save();
        } else {
            user = await User.create({
                phone,
                otp: { code: otp, expiresAt },
                isVerified: false
            });
        }
        
        // Log OTP to console (since Twilio might not be configured)
        console.log(`📱 OTP for ${phone}: ${otp}`);
        
        // Uncomment when Twilio is configured
        // const message = `🔐 *VidyaDeva* OTP\n\nYour login OTP is: *${otp}*\n\nValid for 10 minutes.`;
        // await sendWhatsAppMessage(phone, message);
        
        res.status(200).json({ message: 'OTP sent successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        
        const user = await User.findOne({ phone });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!user.otp || user.otp.code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        
        if (new Date() > user.otp.expiresAt) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        
        user.isVerified = true;
        user.otp = null;
        await user.save();
        
        // Success WhatsApp (uncomment when Twilio ready)
        // const successMessage = `✅ *Login Successful!*\n\nWelcome to *VidyaDeva* 🎉`;
        // await sendWhatsAppMessage(phone, successMessage);
        
        const token = Buffer.from(phone).toString('base64');
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                phone: user.phone,
                isVerified: user.isVerified
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sendOTP, verifyOTP };
