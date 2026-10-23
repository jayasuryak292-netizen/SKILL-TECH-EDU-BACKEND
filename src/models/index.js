
const sequelize = require("../config/database");

const User = require("./User");
const Stream = require("./Stream");
const Subject = require("./Subject");
const Topic = require("./Topic");
const Note = require("./Note");
const Favorite = require("./Favorite");

// Stream → Subjects
Stream.hasMany(Subject, {
  foreignKey: "streamId",
  as: "subjects",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE"
});

Subject.belongsTo(Stream, {
  foreignKey: "streamId",
  as: "stream",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE"
});

// Subject → Topics
Subject.hasMany(Topic, {
  foreignKey: "subjectId",
  as: "topics",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Topic.belongsTo(Subject, {
  foreignKey: "subjectId",
  as: "subject",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Student → Notes
User.hasMany(Note, {
  foreignKey: "studentId",
  as: "notes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Note.belongsTo(User, {
  foreignKey: "studentId",
  as: "student",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Topic → Notes
Topic.hasMany(Note, {
  foreignKey: "topicId",
  as: "notes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Note.belongsTo(Topic, {
  foreignKey: "topicId",
  as: "topic",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Student → Favorites
User.hasMany(Favorite, {
  foreignKey: "studentId",
  as: "favorites",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Favorite.belongsTo(User, {
  foreignKey: "studentId",
  as: "student",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Subject → Favorites
Subject.hasMany(Favorite, {
  foreignKey: "subjectId",
  as: "favorites",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Favorite.belongsTo(Subject, {
  foreignKey: "subjectId",
  as: "subject",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = {
  sequelize,
  User,
  Stream,
  Subject,
  Topic,
  Note,
  Favorite
};
