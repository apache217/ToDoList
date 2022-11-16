const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    require: true,
  },
});

module.exports = mongoose.model("users", userSchema);
