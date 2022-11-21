const TodoModel = require("../models/todo.model");
const Sentry = require("@sentry/node");
const { ObjectId } = require("mongoose");

class TodoService {
  async getAll(data) {
    try {
      const tasks = await TodoModel.find({ _idUser: data });
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
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
  async patchTodo(id, newObj) {
    try {
      const tasks = await TodoModel.updateOne(
        { _id: id },
        {
          $set: newObj,
        }
      );
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async deleteTodo(id) {
    try {
      const tasks = await TodoModel.deleteOne(id);
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}
module.exports = new TodoService();
