const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    let result = await TodoService.getTodos()
    res.status(200).send(req.todos);
  }
}

module.exports = new TodoController();
