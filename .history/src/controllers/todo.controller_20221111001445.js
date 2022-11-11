const TodoService = require("../services/todo.service");
const Sentry = require("@sentry/node");

class TodoController {
  async getTodos(req, res) {
    try {
      const _idUser = req.users.find(
        (item) => item.login === req.user.login
      )._id;
      const result = req.todos
        .filter((item) => _idUser === item._idUser)
        .sort((a, b) => a.id - b.id);
      // result.id = result._id;
      // result.idUser = result._idUser;
      // delete result._id;
      // delete result._idUser;
      res.status(200).send(result);
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
  async postTodo(req, res) {
    try {
      req.body._idUser = req.users.find(
        (item) => item.login === req.user.login
      )._id;
      const write = await TodoService.postTodo(req.body);
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
      const task = req.todos.find((item) => item.id === req.params.id);
      task
        ? (task.title = req.body.title)
        : res.status(404).send(`Task is not found!`);
      const write = await TodoService.patchTitle(req.data);
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
      const task = req.todos.find((item) => item.id === req.params.id);
      task
        ? (task.isCompleted = req.body.isCompleted)
        : res.status(404).send(`Task is not found!`);
      const write = await TodoService.patchStatus(req.data);
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
        const i = todos.findIndex((item) => item.id === req.params.id);
        todos.splice(i, 1);
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
