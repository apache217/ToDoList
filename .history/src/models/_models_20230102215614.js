const Auth = require("./auth.model");
const Todo = require("./todo.model");

Users.hasOne(Students, { foreignKey: "_id" });
Students.belongsTo(Users, { foreignKey: "_idUser" });

Students.belongsToMany(Modules, {
  through: "studentModules",
});
Modules.belongsToMany(Students, {
  through: "studentModules",
});

const _models = {
  Modules,
  SocialNetworks,
  StudentModules,
  Users,
  Students,
};

module.exports = _models;
