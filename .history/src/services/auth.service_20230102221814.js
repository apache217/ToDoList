const { Users, Todos } = require("../models/_model");
const Sentry = require("@sentry/node");

class AuthService {
  async postUser(data) {
    try {
      const newUser = Users.create({ ...data, password: hashedPassword });
      return newUser;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  async getAll() {
    try {
      return new Promise((res) => {
        Users.findAll().then((result) => res(result));
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
