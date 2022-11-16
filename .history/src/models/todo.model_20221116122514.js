const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
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
