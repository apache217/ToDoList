const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRE_CONNECTION_STRING)

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
