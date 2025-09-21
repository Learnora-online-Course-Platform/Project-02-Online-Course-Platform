const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Course = sequelize.define("Course", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  difficulty: { type: DataTypes.ENUM("beginner", "intermediate", "advanced") },
  price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  thumbnail: { type: DataTypes.STRING },
});

Course.associate = (models) => {
  Course.belongsTo(models.User, { foreignKey: "instructorId", as: "instructor" });
  Course.hasMany(models.CourseMaterial, { foreignKey: "courseId" });
  Course.hasMany(models.Quiz, { foreignKey: "courseId" });
  Course.hasMany(models.Assignment, { foreignKey: "courseId" });
  Course.hasMany(models.Payment, { foreignKey: "courseId" });
  Course.hasMany(models.Forum, { foreignKey: "courseId" });
  Course.hasMany(models.Progress, { foreignKey: "courseId" });
};

module.exports = Course;
