const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres::memory:");

const UserSchema = sequelize.define("user", {
  id: {
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

module.exports = UserSchema;
