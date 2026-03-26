const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exam = sequelize.define('Exam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        comment: 'SSC, Banking, Railway, State PSC, etc.'
    },
    exam_level: {
        type: DataTypes.ENUM('central', 'state'),
        defaultValue: 'central'
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true  // NULL for central exams
    },
    eligibility: {
        type: DataTypes.JSONB,
        allowNull: false
        // Stores: { min_education, min_percentage, stream_allowed, age_min, age_max }
    },
    posts: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    exam_pattern: {
        type: DataTypes.JSONB,
        defaultValue: {}
    },
    official_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'exams',
    timestamps: true
});

module.exports = Exam;
