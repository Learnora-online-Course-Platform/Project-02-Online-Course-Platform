const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CourseMaterial = sequelize.define("CourseMaterial", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  type: { type: DataTypes.ENUM("video", "pdf", "quiz"), allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
});

CourseMaterial.associate = (models) => {
  CourseMaterial.belongsTo(models.Course, { foreignKey: "courseId" });
};

module.exports = CourseMaterial;
