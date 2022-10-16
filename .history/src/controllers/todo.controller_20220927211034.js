const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);

class TodoController {
  getTodos(req, res) {
    res.send(TodoService.getTodos());
  }
}

module.exports = new TodoController();
