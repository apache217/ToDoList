const TodoModel = require("../models/todo.model");
const Sentry = require("@sentry/node");

class TodoService {
  async postTodo(data) {
    try {
      const task = new TodoModel(data);
      const savedTasks = task.save();
      return savedTasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async getAll() {
    try {
      const tasks = await TodoModel.find();
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async patch(id, newObj) {
    try {
      const tasks = await TodoModel.updateOne(id, newObj);
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async deleteTodo(id) {
    try {
      const tasks = await TodoModel.remove(id);
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}
module.exports = new TodoService();
