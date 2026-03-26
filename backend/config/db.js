const { Sequelize } = require('sequelize');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false, // console log band karne ke liye
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Connected');
        
        // Sync all models (development me use karo)
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced');
    } catch (error) {
        console.error('❌ PostgreSQL Error:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
