const { Sequelize, Model, DataTypes } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize('postgres://vladi:24Vlad2022@localhost:5432/ToDo')

const Users = sequelize.define("user", {
  _id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  login: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: true },
  age: { type: Sequelize.INTEGER, allowNull: true },
  isMan: { type: Sequelize.BOOLEAN, allowNull: true },
  city: { type: Sequelize.STRING, allowNull: true },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: true },
});

module.exports = Users;
