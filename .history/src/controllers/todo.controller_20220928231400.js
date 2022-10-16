const { validationResult } = require("express-validator");
const TodoService = require(`../services/todo.service`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const saltRounds = 10;

class TodoController {
  async getTodos(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`--Error--`);
      return res.status(400).send({
        success: false,
        errors: errors.array()
      })
    }
    let result = await TodoService.getTodos();
    res.status(200).send(result);
  }
}

module.exports = new TodoController();
