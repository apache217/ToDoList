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
    data.push(req.body);
    TodoService.postTodo(req.body);
    
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