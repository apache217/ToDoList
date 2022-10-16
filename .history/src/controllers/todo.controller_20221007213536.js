import { validationResult } from "express-validator";
import { getTodos as _getTodos, postTodo as _postTodo } from `../services/todo.service`;
import bcrypt from "bcrypt";
import uuid from "uuid";
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    let data = await _getTodos();
    let todoArr = data.todos;
    let result = todoArr.filter((item) => req.body.id === item.userId);
    res.status(200).send(result);
  }
  async postTodo(req, res) {
    let data = await _getTodos();
    data.todos.push(req.body);
    await _postTodo(data);
    let result = await _getTodos();
    res.status(200).send(result);
    // res.status(200).send(`New task created!`);
  }
  async patchTitle(req, res) {
    _postTodo(req.body);
  }
  async postStatus(req, res) {
    _postTodo(req.body);
  }
  async deleteTodo(req, res) {
    _postTodo(req.body);
  }
}

export default new TodoController();
