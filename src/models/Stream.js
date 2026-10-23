const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Stream = sequelize.define(
  "Stream",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Stream name is required"
        }
      }
    },

    code: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Stream code is required"
        }
      }
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active"
    }
  },
  {
    tableName: "streams",
    timestamps: true,
    underscored: true
  }
);

module.exports = Stream;
