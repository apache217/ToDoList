const { Sequelize } = require("sequelize");

module.exports = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});
