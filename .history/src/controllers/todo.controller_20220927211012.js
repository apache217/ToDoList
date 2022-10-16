const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);

class UserController {
  getTodos(req, res) {
    res.send();
  }
}

module.exports = new TodoController();
