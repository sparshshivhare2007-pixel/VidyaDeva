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
    
    // ========== PROFILE FIELDS ==========
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    education: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '10th, 12th, graduate, postgraduate, diploma'
    },
    stream: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'science, commerce, arts, other'
    },
    percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    district: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    
    // ========== ADD THESE NEW FIELDS ==========
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        comment: 'Array of skills like Communication, Python, etc.'
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Career interests like Government Job, Banking, etc.'
    },
    photo: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Base64 encoded profile photo'
    },
    
    // ========== OPTIONAL: FOR FUTURE USE ==========
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true
    },
    category: {
        type: DataTypes.ENUM('general', 'obc', 'sc', 'st', 'other'),
        allowNull: true
    }
    
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
