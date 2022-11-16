const AuthModel = require("../models/auth.model");
const Sentry = require("@sentry/node");

class AuthService {
  async postUser(data) {
    try {
      const task = new AuthModel(data);
      const savedTasks = task.save();
      return savedTasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async getAll() {
    try {
      const tasks = await AuthModel.find();
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
