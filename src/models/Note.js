
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define(
  "Note",
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

 topicId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  field: "topic_id"
},

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Note title is required"
        }
      }
    },

    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Note content is required"
        }
      }
    }
  },
  {
    tableName: "notes",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["student_id", "topic_id"]
      }
    ]
  }
);

module.exports = Note;
