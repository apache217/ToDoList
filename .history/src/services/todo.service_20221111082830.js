const fs = require("fs");
const tasksRep = require("../dao/todosRepository");
const Sentry = require("@sentry/node");

class TodoService {
  async getAll() {
    try {
      return await tasksRep.getAll();
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async postTodo(task) {
    try {
      return await tasksRep.add(task);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchTitle(id, newObj) {
    try {
      return tasksRep.edittodo(id, newObj);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchStatus(id, newObj) {
    try {
      return tasksRep.edittodo(id, newObj);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async deleteTodo(data) {
    try {
      return await tasksRep.removetodo(id);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new TodoService();
