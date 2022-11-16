const mongoose = require("mongoose");
const db = mongoose.connection;
const AuthModel = require("../models/auth.model");
const { ObjectId } = require("mongodb");
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
