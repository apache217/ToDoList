const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
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
    require: true,
  },
  _idUser: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("todos", todoSchema);
