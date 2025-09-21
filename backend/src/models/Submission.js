const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Submission = sequelize.define("Submission", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fileUrl: { type: DataTypes.STRING },
  grade: { type: DataTypes.STRING },
  feedback: { type: DataTypes.TEXT },
});

Submission.associate = (models) => {
  Submission.belongsTo(models.Assignment, { foreignKey: "assignmentId" });
  Submission.belongsTo(models.User, { foreignKey: "studentId" });
};

module.exports = Submission;
