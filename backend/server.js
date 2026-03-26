const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load .env
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔍 Checking environment...');
console.log('📦 DATABASE_URL:', process.env.DATABASE_URL ? '✅ Loaded' : '❌ NOT LOADED');

const { connectDB } = require('./config/db');

// Connect to Supabase PostgreSQL
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for photo uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes')); // ✅ ADD THIS LINE

// Test route
app.get('/', (req, res) => {
    res.send('VidyaDeva API is running with Supabase PostgreSQL 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 API URL: http://localhost:${PORT}/api/auth`);
    console.log(`👤 Profile API: http://localhost:${PORT}/api/user`);
});
