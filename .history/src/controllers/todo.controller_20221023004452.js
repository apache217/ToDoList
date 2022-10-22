const jwt = require("jsonwebtoken");
const TodoService = require("../services/todo.service");
const uuid = require("uuid");
const Sentry = require("@sentry/node");

class TodoController {
  async getTodos(req, res) {
    try {
      const idUser = req.users.find(
        (item) => item.login === req.user.login
      ).idUser;
      const result = req.todos
        .filter((item) => idUser === item.idUser)
        .sort((a, b) => a.id - b.id);
      res.status(200).send(result);
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
  async postTodo(req, res) {
    try {
      const idUser = req.users.find(
        (item) => item.login === req.user.login
      ).idUser;
      const result = {};
      req.body.id = uuid.v1();
      console.log(idUser);
      req.body.idUser = idUser;
      req.todos.push(req.body);
      result.users = req.users;
      result.todos = req.todos;
      const write = await TodoService.postTodo(result);
      if (write) {
        res.status(200).send(`New task created!`);
      } else {
        res.status(500).send(`Not written!`);
      }
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
  async patchTitle(req, res) {
    try {
      const result = {};
      const task = req.todos.find((item) => item.id === req.params.id);
      task
        ? (task.title = req.body.title)
        : res.status(404).send(`Task is not found!`);
      result.users = req.users;
      result.todos = req.todos;
      const write = await TodoService.patchTitle(result);
      write
        ? res.status(200).send(`Title is changed!`)
        : res.status(500).send(`Title is not changed!`);
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
  async patchStatus(req, res) {
    try {
      const result = {};
      const task = req.todos.find((item) => item.id === req.params.id);
      task
        ? res.status(404).send(`Task is not found!`)
        : (task.isCompleted = req.body.isCompleted);
      result.users = req.users;
      result.todos = req.todos;
      const write = await TodoService.patchStatus(result);
      write
        ? res.status(200).send(`Status is changed!`)
        : res.status(500).send(`Status is not changed!`);
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
  async deleteTodo(req, res) {
    try {
      const result = {};
      if (!req.todos.find((item) => item.id === req.params.id)) {
        res.status(404).send(`Task is not found!`);
      } else {
        const i = req.todos.findIndex((item) => item.id === req.params.id);
        req.todos.splice(i, 1);
        result.users = req.users;
        result.todos = req.todos;
        const write = await TodoService.deleteTodo(result);
        if (write) {
          res.status(200).send(`Task is removed!`);
        } else {
          res.status(500).send(`Task is not removed!`);
        }
      }
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = new TodoController();
