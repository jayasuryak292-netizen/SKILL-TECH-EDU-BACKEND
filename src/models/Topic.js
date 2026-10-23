
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Topic = sequelize.define(
  "Topic",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    subjectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "subject_id"
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Topic title is required"
        }
      }
    },

    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Topic slug is required"
        }
      }
    },

    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Topic content is required"
        }
      }
    },

    flowchart: {
      type: DataTypes.TEXT("long"),
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM("draft", "review", "published"),
      allowNull: false,
      defaultValue: "draft"
    },

    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "display_order"
    }
  },
  {
    tableName: "topics",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    underscored: false,
    indexes: [
      {
        unique: true,
        fields: ["subject_id", "slug"]
      }
    ]
  }
);

module.exports = Topic;
