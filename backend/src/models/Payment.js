const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM("pending", "completed", "failed"), defaultValue: "pending" },
  transactionId: { type: DataTypes.STRING },
});

Payment.associate = (models) => {
  Payment.belongsTo(models.User, { foreignKey: "userId" });
  Payment.belongsTo(models.Course, { foreignKey: "courseId" });
};

module.exports = Payment;
