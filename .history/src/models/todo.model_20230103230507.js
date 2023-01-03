const Sequelize = require("sequelize");
const sequelize = new Sequelize('postgres://vladi:24Vlad2022@localhost:5432/ToDo')

const Todos = sequelize.define("todo", {
  _id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  _idUser: { type: Sequelize.BOOLEAN, allowNull: false },
  title: { type: Sequelize.STRING, allowNull: false },
  isCompleted: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = Todos;
