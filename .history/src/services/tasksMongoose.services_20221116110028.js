const mongoose = require("mongoose");
const db = mongoose.connection;
const TasksModel = require("../models/tasks.model");

const { ObjectId } = require("mongodb");

class TodoMongooseServices {
  // async addTask(data) {
  //   const tasks = await db.collection("tasks").insertOne(data);
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

  async addTask(data) {
    const task = new TasksModel(data);
    const savedTasks = task.save();
    return savedTasks;
  }
  
  async getTasks() {
    const tasks = await TasksModel.find();
    return tasks;
  }
}

module.exports = new TodoMongooseServices();
