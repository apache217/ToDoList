const Sequelize = require("sequelize");
const sequelize = require("../config/todo_data");

const TodoSchema = sequelize.define("todo", {
  title: { type: Sequelize.STRING, allowNull: false },
  isCompleted: DataTypes.BOOLEAN,
  _idUser: DataTypes.TEXT,
});

module.exports = TodoSchema;
