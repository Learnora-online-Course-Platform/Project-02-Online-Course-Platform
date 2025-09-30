const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT },
  userId: { type: DataTypes.INTEGER },
  courseId: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = Review;
