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
    req.body.id = uuid.v1();
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
    req.todos.find((item) => item.id === req.params.id).title = req.body.title;
    result.users = req.users;
    result.todos = req.todos;
    let write = await TodoService.patchTitle(result);
    if (write) {
      res.status(200).send(`Title is changed!`);
    } else {
      res.status(500).send(`Title is not changed!`);
    }
  }
  async patchStatus(req, res) {
    let result = {};
    req.todos.find((item) => item.id === req.params.id).isCompleted =
      req.body.isCompleted;
    result.users = req.users;
    result.todos = req.todos;
    let write = await TodoService.patchStatus(result);
    if (write) {
      res.status(200).send(`Status is changed!`);
    } else {
      res.status(500).send(`Status is not changed!`);
    }
  }
  async deleteTodo(req, res) {
    let i = req.todos.findIndex((item) => item.id === req.params.id);
    res.status(200).send(`Status is changed!`);
    // req.todos.splice()
  }
}

module.exports = new TodoController();
