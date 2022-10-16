const { validationResult } = require("express-validator");
const UsersService = require(`../services/todo.service`);

class UserController {
  getTodos(req, res) {
    res.send(`У тебя получится!`);
  }
}

module.exports = new UserController();
