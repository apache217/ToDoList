const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  getTodos(req, res) {
    res.send(req.todos);
  }
}

module.exports = new TodoController();
