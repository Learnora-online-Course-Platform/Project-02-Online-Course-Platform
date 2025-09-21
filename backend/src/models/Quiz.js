const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Quiz = sequelize.define("Quiz", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  question: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON, allowNull: false },
  correctAnswer: { type: DataTypes.STRING, allowNull: false },
});

Quiz.associate = (models) => {
  Quiz.belongsTo(models.Course, { foreignKey: "courseId" });
};

module.exports = Quiz;
