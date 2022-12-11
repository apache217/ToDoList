const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres::memory:");

const TodoSchema = sequelize.define("todo", {
  title: { type: Sequelize.STRING, allowNull: false },
  isCompleted: { type: Sequelize.BOOLEAN, allowNull: false },
  _idUser: { type: Sequelize.BOOLEAN, allowNull: false },
});

const UserSchema = sequelize.define("user", {
  login: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  age: { type: Sequelize.INTEGER, allowNull: false },
  isMan: { type: Sequelize.BOOLEAN, allowNull: false },
  city: { type: Sequelize.STRING, allowNull: false },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: false },
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = UserSchema;
