const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            len: [10, 15]
        }
    },
    otp_code: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    otp_expires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // Profile fields (phase 2 ke liye)
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stream: {
        type: DataTypes.STRING,
        allowNull: true
    },
    percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    district: {
        type: DataTypes.STRING,
        allowNull: true
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
