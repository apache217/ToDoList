const { Users, Todos } = require("../models/_models");
const Sentry = require("@sentry/node");

class TodoService {
  async getAll(data) {
    try {
      const result = await Todos.findAll({
        where: { _idUser: data },
        raw: true,
      });
      return result;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async postTodo(data) {
    try {
      const result = Todos.create(data);
      return result;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async patchTodo(id, newObj) {
    try {
      await Todos.update(newObj, { where: { _id } });
      const result = await Todos.findOne({
        where: { _id },
      });
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
