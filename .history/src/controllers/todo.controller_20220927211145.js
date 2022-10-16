const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);

class TodoController {
  getTodos(req, res) {
    res.send(req.todos);
  }
}

module.exports = new TodoController();
