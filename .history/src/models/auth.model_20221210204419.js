const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres::memory:");

const TodoSchema = sequelize.define("todo", {
  title: { type: Sequelize.STRING, allowNull: false },
  isCompleted: { type: Sequelize.BOOLEAN, allowNull: false },
  _idUser: { type: Sequelize.BOOLEAN, allowNull: false },
});

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    isMan: {
      type: Boolean,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: false,
    },
  },
  { versionKey: false }
);

module.exports = UserSchema;
