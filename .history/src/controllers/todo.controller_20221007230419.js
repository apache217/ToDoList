const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    let data = await TodoService.getTodos();
    let todoArr = data.todos;
    let result = todoArr.filter((item) => req.body.id === item.userId);
    res.status(200).send(result);
  }
  async postTodo(req, res) {
    let data = await TodoService.getTodos();
    let result = {};
    if (data.users.find((item) => item.id === req.params.id)) {
      req.body.userId = req.params.id;
      result = TodoService.postTodo(req.body);
      res.status(200).send(result.todos);
    }
    if (!data.users.find((item) => item.id === req.params.id)) {
      res.status(404).send(`User not found`);
    }
  }
  async patchTitle(req, res) {
    TodoService.postTodo(req.body);
  }
  async postStatus(req, res) {
    TodoService.postTodo(req.body);
  }
  async deleteTodo(req, res) {
    TodoService.postTodo(req.body);
  }
}

module.exports = new TodoController();
