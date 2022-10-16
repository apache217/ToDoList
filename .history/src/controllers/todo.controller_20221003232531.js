const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    let data = await TodoService.getTodos();
    let todoArr = data.todos;
    // let result = todoArr.map(item => req.id === item.userId)
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let result = await UsersService.createUser({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).send(result);
  }
  async postTodo(req, res) {
    TodoService.postTodo(req.body);
  }
}

module.exports = new TodoController();
