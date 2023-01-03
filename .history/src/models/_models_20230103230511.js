const Users = require("./auth.model");
const Todos = require("./todo.model");

Users.hasOne(Todos, { foreignKey: "_id" });
Todos.belongsTo(Users, { foreignKey: "_idUser" });

const _models = {
  Users,
  Todos,
};

module.exports = _models;
