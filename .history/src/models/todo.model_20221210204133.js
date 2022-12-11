const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgre::memory:");

const TodoSchema = sequelize.define("todo", {
  title: { type: Sequelize.STRING, allowNull: false },
  isCompleted: { type: Sequelize.BOOLEAN, allowNull: false },
  _idUser: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = TodoSchema;
