const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const todoSchema = sequelize.define("todo",
  {
    title: {
      type: String,
      require: true,
    },
    isCompleted: {
      type: String,
      require: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      require: false,
    },
    _idUser: {
      type: Object,
      require: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("todos", todoSchema);
