const User = require("./auth.model");
const Todo = require("./todo.model");

Users.hasOne(Todo, { foreignKey: "_id" });
Todos.belongsTo(User, { foreignKey: "_idUser" });

const _models = {
  User,
  Todo,
};

module.exports = _models;
