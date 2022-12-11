const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/todo_data");

const todoSchema = sequelize.define("todo", {
  title: {DataTypes.TEXT},
  isCompleted: DataTypes.BOOLEAN,
  _idUser: DataTypes.TEXT,
});

module.exports = sequelize.model("todos", todoSchema);
