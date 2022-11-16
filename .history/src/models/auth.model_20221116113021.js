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
});

// {
//     "login": "example@example.com",
//     "password": "$2b$10$fhSyhG/Wa1R12Mh/E9njFuHWq3g4g9Ip7721MhYK7jhwWY3rswSAS",
//     "name": "Vlad",
//     "age": 24,
//     "isMan": true,
//     "city": "Minsk",
//     "isAdmin": false
//   }

module.exports = mongoose.model("users", userSchema);
