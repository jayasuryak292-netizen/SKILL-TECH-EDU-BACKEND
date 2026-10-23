
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },

    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "student_id"
    },

    subjectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "subject_id"
    }
  },
  {
    tableName: "favorites",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "subject_id"]
      }
    ]
  }
);

module.exports = Favorite;
