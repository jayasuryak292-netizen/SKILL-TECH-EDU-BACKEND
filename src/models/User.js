const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    fullName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "full_name",
      validate: {
        notEmpty: {
          msg: "Full name is required"
        }
      }
    },

    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Enter a valid email address"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },

    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash"
    },

    role: {
      type: DataTypes.ENUM(
        "super_admin",
        "main_admin",
        "staff",
        "student"
      ),
      allowNull: false,
      defaultValue: "student"
    },

    status: {
      type: DataTypes.ENUM("active", "inactive", "suspended"),
      allowNull: false,
      defaultValue: "active"
    }
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true
  }
);

module.exports = User;
