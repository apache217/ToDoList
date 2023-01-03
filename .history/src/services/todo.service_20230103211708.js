const { Users, Todos } = require("../models/_models");
const Sentry = require("@sentry/node");

class TodoService {
  async getAll(data) {
    try {
      const result = await Todos.findAll();
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
      return new Promise(async (res) => {
        await Students.update(body, { where: { id } });
        await Students.findOne({
          where: { id },
        }).then((result) => res(result));
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
