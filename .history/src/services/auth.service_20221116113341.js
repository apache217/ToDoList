const mongoose = require("mongoose");
const db = mongoose.connection;
const AuthModel = require("../models/auth.model");
const { ObjectId } = require("mongodb");
const Sentry = require("@sentry/node");

class AuthService {
  //   async getAll() {
  //     try {
  //       return await usersRep.getAll();
  //     } catch (err) {
  //       console.log(err);
  //       Sentry.captureException(err);
  //     }
  //   }
  //   async postUser(user) {
  //     try {
  //       return await usersRep.add(user);
  //     } catch (error) {
  //       console.log(error);
  //       Sentry.captureException(error);
  //     }
  //   }
  // }

  // async addTask(data) {
  //   const tasks = await db.collection("todos").insertOne(data);
  //   return tasks;
  // }
  // getTasks() {
  //   return new Promise((res, rej) => {
  //     const tasks = db
  //       .collection("tasks")
  //       .find()
  //       .toArray((err, result) => {
  //         if (err) throw err;
  //         res(result);
  //       });
  //   });
  // }

  async postTodo(data) {
    try {
      const task = new TodoModel(data);
      const savedTasks = task.save();
      return savedTasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }

  async getAll() {
    try {
      const tasks = await TodoModel.find();
      return tasks;
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new AuthService();
