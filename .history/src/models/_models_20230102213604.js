const Auth = require("./auth.model");
const Todo = require("./todo.model");

Users.hasOne(Students, { foreignKey: "user_id" });
Students.belongsTo(Users, { foreignKey: "user_id" });

Students.hasOne(SocialNetworks, { foreignKey: "student_id" });
SocialNetworks.belongsTo(Students, { foreignKey: "student_id" });

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
