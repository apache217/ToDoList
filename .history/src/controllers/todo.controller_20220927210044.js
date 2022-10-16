const { validationResult } = require("express-validator");
const UsersService = require(`../services/todo.service`);

class UserController {
  getTodos(req, res) {
    res.send(`У тебя будет работа мечты.`);
  }
}

module.exports = new UserController();
