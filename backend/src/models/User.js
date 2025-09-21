const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  photo: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("student", "instructor", "admin"), defaultValue: "student" },
});

User.associate = (models) => {
  User.hasMany(models.Course, { foreignKey: "instructorId" });
  User.hasMany(models.Payment, { foreignKey: "userId" });
  User.hasMany(models.Submission, { foreignKey: "studentId" });
  User.hasMany(models.Progress, { foreignKey: "userId" });
  User.hasMany(models.Forum, { foreignKey: "userId" });
  User.hasMany(models.Message, { foreignKey: "senderId", as: "SentMessages" });
  User.hasMany(models.Message, { foreignKey: "receiverId", as: "ReceivedMessages" });
};

module.exports = User;
