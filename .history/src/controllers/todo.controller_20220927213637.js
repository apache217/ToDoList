const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class TodoController {
  getTodos(req, res) {
    res.send(req.todos);
  }
}

module.exports = new TodoController();
