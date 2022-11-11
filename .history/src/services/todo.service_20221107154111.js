const fs = require("fs");
const tasksRep = require("../dao/tasksRepository");
const Sentry = require("@sentry/node");

class TodoService {
  getOneUser(login) {
    return new Promise((res, rej) => {
      try {
        fs.readFile("./data.json", (err, data) => {
          if (err) {
            Sentry.captureException(err);
            return res(false);
          }
          const users = JSON.parse(data).users;
          if (users) {
            const filtredUser = users.find((item) => item.login === login);
            return res(filtredUser);
          } else {
            return res(false);
          }
        });
      } catch (err) {
        console.log(err);
        Sentry.captureException(err);
      }
    });
  }
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
