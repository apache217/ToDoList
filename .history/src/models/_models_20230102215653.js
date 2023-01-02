const Users = require("./auth.model");
const Todo = require("./todo.model");

Users.hasOne(Students, { foreignKey: "_id" });
Todo.belongsTo(Users, { foreignKey: "_idUser" });

const _models = {
  Users,
  Todo,
};

module.exports = _models;
