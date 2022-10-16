const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    let todoArr = await TodoService.getTodos();
    let result = todoArr.map(item => req.id === item.userId)
    res.status(200).send(result);
  }
  async postTodo(req, res) {
    
    TodoService.postTodo(req.body)
  }
}

module.exports = new TodoController();
