const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔍 MONGO_URI:', process.env.MONGO_URI ? '✅ Loaded' : '❌ NOT LOADED (PostgreSQL mode)');
console.log('🔍 PostgreSQL Config:', {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
});

const { connectDB } = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('VidyaDeva API is running with PostgreSQL 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
