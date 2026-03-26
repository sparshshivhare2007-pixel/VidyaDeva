const { Sequelize } = require('sequelize');
require('dotenv').config();

// Supabase PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Supabase PostgreSQL Connected');
        
        // Sync all models (create tables if not exist)
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced');
    } catch (error) {
        console.error('❌ Database Error:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
