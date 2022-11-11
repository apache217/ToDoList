const fs = require("fs");
const usersRep = require("../dao/usersRepository");
const Sentry = require("@sentry/node");

class AuthService {
  async getAllUsers() {
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
  async deleteUser(userId) {
    try {
      return await usersRep.remove_user(userId);
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
