const TodoService = require("../services/todo.service");
const Sentry = require("@sentry/node");
const { ObjectId } = require("mongodb");

class TodoController {
  async getTodos(req, res) {
    try {
      const _idUser = req.users.find(
        (item) => item.login === req.user.login
      )._id;
      const result = req.todos
        .filter((item) => `${item._idUser}` === `${_idUser}`)
        .map((item) => {
          item.id = item._id;
          item.idUser = item._idUser;
          Reflect.deleteProperty(item, `_id`);
          Reflect.deleteProperty(item, `_idUser`);
          return item;
        });
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
      const task = req.todos.find((item) => `${item._id}` === req.params.id);
      task
        ? (task.title = req.body.title)
        : res.status(404).send(`Task is not found!`);
      const write = await TodoService.patchTitle(task._id, task);
      console.log(task);
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
      const task = req.todos.find((item) => `${item._id}` === req.params.id);
      task
        ? (task.isCompleted = req.body.isCompleted)
        : res.status(404).send(`Task is not found!`);
      const write = await TodoService.patchStatus(task._id, task);
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
      if (!req.todos.find((item) => `${item._id}` === req.params.id)) {
        res.status(404).send(`Task is not found!`);
      } else {
        const i = req.todos.findIndex((item) => `${item._id}` === req.params.i);
        const delete = await TodoService.deleteTodo(result);
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
