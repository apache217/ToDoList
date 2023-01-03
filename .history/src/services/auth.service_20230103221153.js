const { Users, Todos } = require("../models/_models");
const Sentry = require("@sentry/node");

class AuthService {
  async postUser(data) {
    try {
      const newUser = await Users.create(data);
      return newUser;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async getAll() {
    try {
      const result = await Users.findAll();
      return result;
    } catch (error) {
      console.log(error.message);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
