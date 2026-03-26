const express = require('express');
const { User } = require('../models');
const router = express.Router();

// Save/Update user profile
router.post('/profile', async (req, res) => {
    try {
        const { phone, fullName, education, stream, percentage, state, skills, interests, photo } = req.body;
        
        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required' });
        }
        
        let user = await User.findOne({ where: { phone } });
        
        if (user) {
            // Update existing user
            user.name = fullName || user.name;
            user.education = education || user.education;
            user.stream = stream || user.stream;
            user.percentage = percentage || user.percentage;
            user.state = state || user.state;
            user.skills = skills || user.skills;
            user.interests = interests || user.interests;
            user.photo = photo || user.photo;
            await user.save();
        } else {
            // Create new user with profile
            user = await User.create({
                phone,
                name: fullName,
                education,
                stream,
                percentage,
                state,
                skills,
                interests,
                photo,
                is_verified: true
            });
        }
        
        res.status(200).json({ 
            message: 'Profile saved successfully', 
            user: {
                phone: user.phone,
                name: user.name,
                education: user.education,
                stream: user.stream,
                percentage: user.percentage,
                state: user.state,
                skills: user.skills,
                interests: user.interests,
                photo: user.photo
            }
        });
    } catch (error) {
        console.error('Profile save error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user profile
router.get('/profile/:phone', async (req, res) => {
    try {
        const user = await User.findOne({ where: { phone: req.params.phone } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            phone: user.phone,
            name: user.name,
            education: user.education,
            stream: user.stream,
            percentage: user.percentage,
            state: user.state,
            skills: user.skills,
            interests: user.interests,
            photo: user.photo,
            is_verified: user.is_verified
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
