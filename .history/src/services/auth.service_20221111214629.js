const fs = require("fs");
const usersRep = require("../dao/usersRepository");
const Sentry = require("@sentry/node");

class AuthService {
  async getAll() {
    try {
      return await usersRep.getAll();
    } catch (err) {
      console.log(err);
      Sentry.captureException(err);
    }
  }
  async postUser(user) {
    try {
      return await usersRep.add(user);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
