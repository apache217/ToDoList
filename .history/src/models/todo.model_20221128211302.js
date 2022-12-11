const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const todoSchema = sequelize.define("todo", {
  title: DataTypes.TEXT,
  isCompleted: DataTypes.BOOLEAN,
  _idUser: DataTypes.TEXT,
});

module.exports = sequelize.model("todos", todoSchema);
