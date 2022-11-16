const mongoose = require("mongoose");


const authSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  isCompleted: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("users", usersSchema);
