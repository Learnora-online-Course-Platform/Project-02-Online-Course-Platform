const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  
  name: { type: DataTypes.STRING, allowNull: false },

  email: { type: DataTypes.STRING, allowNull: false, unique: true },

  password: { type: DataTypes.STRING, allowNull: false },

  contactNumber: { type: DataTypes.STRING, allowNull: true },

  qualifications: { type: DataTypes.STRING, allowNull: true },

  bio: { type: DataTypes.TEXT, allowNull: true },

  profileImage: { type: DataTypes.STRING, allowNull: true },

  role: { 
    type: DataTypes.ENUM("student", "instructor", "admin"),
    defaultValue: "student"
  },

  // ✅ Email verification
  emailVerified: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },

  emailVerificationToken: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },

  // ✅ Password reset fields
  passwordResetToken: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },

  passwordResetExpires: { 
    type: DataTypes.DATE, 
    allowNull: true 
  }
}, {
  tableName: "Users", // ensure matches migration table name
  timestamps: true
});

// Associations (keep your existing ones)
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
