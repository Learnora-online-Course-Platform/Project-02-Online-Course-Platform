const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Message = sequelize.define("Message", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
});

Message.associate = (models) => {
  Message.belongsTo(models.User, { foreignKey: "senderId", as: "Sender" });
  Message.belongsTo(models.User, { foreignKey: "receiverId", as: "Receiver" });
};

module.exports = Message;
