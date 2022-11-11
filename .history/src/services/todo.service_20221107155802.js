const fs = require("fs");
const tasksRep = require("../dao/todosRepository");
const Sentry = require("@sentry/node");

class TodoService {
  async getTodos() {
    try {
      return await tasksRep.getAll();
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async postTodo(data) {
    try {
      return await tasksRep.add(task);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchTitle(data) {
    try {
      return tasksRep.editTask(id, newObj);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchStatus(data) {
    try {
      return tasksRep.editTask(id, newObj);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async deleteTodo(data) {
    try {
      return await tasksRep.removeTask(id);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new TodoService();
