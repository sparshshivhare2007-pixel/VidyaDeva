const express = require('express');
const { User } = require('../models');
const router = express.Router();

// Save/Update user profile
router.post('/profile', async (req, res) => {
    try {
        const { phone, fullName, education, stream, percentage, state, skills, interests, photo } = req.body;
        
        let user = await User.findOne({ where: { phone } });
        
        if (user) {
            user.name = fullName;
            user.education = education;
            user.stream = stream;
            user.percentage = percentage;
            user.state = state;
            user.skills = skills;
            user.interests = interests;
            user.photo = photo;
            await user.save();
        } else {
            user = await User.create({
                phone,
                name: fullName,
                education,
                stream,
                percentage,
                state,
                skills,
                interests,
                photo
            });
        }
        
        res.status(200).json({ message: 'Profile saved', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user profile
router.get('/profile/:phone', async (req, res) => {
    try {
        const user = await User.findOne({ where: { phone: req.params.phone } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
