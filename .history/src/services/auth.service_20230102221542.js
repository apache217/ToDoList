const { Users, Todos } = require("../models/_model");
const Sentry = require("@sentry/node");

class AuthService {
  async postUser(data) {
    try {
      const user = new Users(data);
      const savedUsers = user.save();
      return savedUsers;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async getAll() {
    try {
      const users = await AuthModel.find();
      return users;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
