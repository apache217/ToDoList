const { Users, Todos } = require("../models/_model");
const Sentry = require("@sentry/node");

class AuthService {
  async postUser(data) {
    try {
      const newUser = Users.create({ ...body, password: hashedPassword });
      return newUser;
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
