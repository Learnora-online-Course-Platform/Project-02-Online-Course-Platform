const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Assignment = sequelize.define("Assignment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  deadline: { type: DataTypes.DATE },
});

Assignment.associate = (models) => {
  Assignment.belongsTo(models.Course, { foreignKey: "courseId" });
  Assignment.hasMany(models.Submission, { foreignKey: "assignmentId" });
};

module.exports = Assignment;
