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
    type: String,
    require: true,
  },
  _idUser: {
    type: Object,
    require: true,
  },
});

module.exports = mongoose.model("todos", todoSchema);
