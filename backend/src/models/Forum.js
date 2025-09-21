const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Forum = sequelize.define("Forum", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
});

Forum.associate = (models) => {
  Forum.belongsTo(models.Course, { foreignKey: "courseId" });
  Forum.belongsTo(models.User, { foreignKey: "userId" });
};

module.exports = Forum;
