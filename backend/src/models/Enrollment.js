const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.ENUM('active','completed','cancelled'), defaultValue: 'active' },
  userId: { type: DataTypes.INTEGER },
  courseId: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = Enrollment;
