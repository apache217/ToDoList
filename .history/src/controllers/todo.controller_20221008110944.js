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
  postTodo(req, res) {
    let result = {};
    if (req.users.find((item) => item.id === req.body.userId)) {
      req.data.push(req.body);
      result = {req.users, req.todos};
      res.status(200).send(`New task created!`);
    }
    if (!req.users.find((item) => item.id === req.body.userId)) {
      res.status(401).send(`Invalid ID`);
    }
  }
  async patchTitle(req, res) {
    let data = await TodoService.getTodos();
    let result = {};
    if (data.users.find((item) => item.id === req.params.id)) {
      result = TodoService.patchTitle(req.body);
      res.status(200).send(result.todos);
    }
  }
  async postStatus(req, res) {
    TodoService.postTodo(req.body);
  }
  async deleteTodo(req, res) {
    TodoService.postTodo(req.body);
  }
}

module.exports = new TodoController();
