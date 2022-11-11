const fs = require("fs");
const Sentry = require("@sentry/node");

class AuthService {
  async getAllUsers() {
    try {
      return await tasksRep.getAll();
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
    }
  }
  async postUser(user) {
    try {
      return await tasksRep.add(user);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
