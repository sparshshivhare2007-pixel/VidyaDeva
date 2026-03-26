const express = require('express');
const dotenv = require('dotenv');
const path = require('path');  // ← ye add kar

// Load environment variables with explicit path
dotenv.config({ path: path.join(__dirname, '.env') });  // ← ye change kar

const cors = require('cors');
const connectDB = require('./config/db');

// Debug: Check if MONGO_URI is loading
console.log('🔍 MONGO_URI:', process.env.MONGO_URI ? '✅ Loaded' : '❌ NOT LOADED');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('VidyaDeva API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API URL: http://localhost:${PORT}/api/auth`);
});
