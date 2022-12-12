const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres::memory:");

const TodoSchema = sequelize.define("todo", {
  _idUser: { type: Sequelize.BOOLEAN, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  isCompleted: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = TodoSchema;
