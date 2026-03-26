const { User } = require('../models');
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
        
        // Find or create user
        let user = await User.findOne({ where: { phone } });
        
        if (user) {
            user.otp_code = otp;
            user.otp_expires = expiresAt;
            await user.save();
        } else {
            user = await User.create({
                phone,
                otp_code: otp,
                otp_expires: expiresAt,
                is_verified: false
            });
        }
        
        console.log(`📱 OTP for ${phone}: ${otp}`);
        
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
        
        const user = await User.findOne({ where: { phone } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (user.otp_code !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        
        if (new Date() > user.otp_expires) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        
        user.is_verified = true;
        user.otp_code = null;
        user.otp_expires = null;
        await user.save();
        
        const token = Buffer.from(phone).toString('base64');
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                phone: user.phone,
                isVerified: user.is_verified
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sendOTP, verifyOTP };
