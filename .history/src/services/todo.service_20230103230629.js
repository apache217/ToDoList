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
      const result = await Todos.create(data);
      return result;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async patchTodo(id, newObj) {
    try {
      await Todos.update(newObj, { where: { id } });
      const result = await Todos.findOne({
        where: { id },
      });
      return result;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async deleteTodo(id) {
    try {
      const result = await Todos.destroy({ where: { id } });
      return result;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}
module.exports = new TodoService();
