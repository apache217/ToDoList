const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    let data = await TodoService.getTodos();
    let todoArr = data.todos;
    let result = todoArr
      .filter((item) => req.body.id === item.userId)
      .sort((a, b) => a.id - b.id);
    res.status(200).send(result);
  }
  async postTodo(req, res) {
    let result = {};
    let id = uuid.v1;
    let task = req.body;
    task = task.unshift(id);
    req.todos.push(req.body);
    result.users = req.users;
    result.todos = req.todos;
    let write = await TodoService.postTodo(result);
    if (write) {
      res.status(200).send(`New task created!`);
    } else {
      res.status(500).send(`Not written!`);
    }
  }
  async patchTitle(req, res) {
    let result = {};
    if (req.users.find((item) => item.id === req.params.id)) {
    }
  }
}

module.exports = new TodoController();
