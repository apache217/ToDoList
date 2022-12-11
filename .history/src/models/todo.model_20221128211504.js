const Sequelize = require("sequelize");
const sequelize = require("../config/todo_data");

const TodoSchema = sequelize.define("todo", {
  title: {DataTypes.TEXT},
  isCompleted: DataTypes.BOOLEAN,
  _idUser: DataTypes.TEXT,
});

module.exports = TodoSchema
