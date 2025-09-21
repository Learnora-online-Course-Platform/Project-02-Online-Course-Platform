const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Progress = sequelize.define("Progress", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  percentComplete: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Progress.associate = (models) => {
  Progress.belongsTo(models.User, { foreignKey: "userId" });
  Progress.belongsTo(models.Course, { foreignKey: "courseId" });
};

module.exports = Progress;
