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
  name: { type: Sequelize.STRING, allowNull: false },
  age: { type: Sequelize.INTEGER, allowNull: false },
  isMan: { type: Sequelize.BOOLEAN, allowNull: false },
  city: { type: Sequelize.STRING, allowNull: false },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: false },
});

module.exports = UserSchema;
