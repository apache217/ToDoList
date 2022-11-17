const TodoService = require("../services/todo.service");
const Sentry = require("@sentry/node");

class TodoController {
  async getTodos(req, res) {
    try {
      const result = req.todos
        .filter((item) => `${item._idUser}` === `${req.user._id}`)
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
      req.body._idUser = req.user._id;
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
      const write = await TodoService.patchTodo(task._id, task);
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
      const write = await TodoService.patchTodo(task._id, task);
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
      const task = req.todos.find((item) => `${item._id}` === req.params.id);
      if (!task) {
        res.status(404).send(`Task is not found!`);
      } else {
        const remove = await TodoService.deleteTodo(task._id);
        if (remove) {
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
