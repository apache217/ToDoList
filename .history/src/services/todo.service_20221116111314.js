const mongoose = require("mongoose");
const db = mongoose.connection;
const TasksModel = require("../models/tasks.model");
const { ObjectId } = require("mongodb");
const Sentry = require("@sentry/node");

// class TodoService {
//   async getAll() {
//     try {
//       return await tasksRep.getAll();
//     } catch (error) {
//       console.log(error);
//       Sentry.captureException(error);
//     }
//   }
//   async postTodo(task) {
//     try {
//       return await tasksRep.add(task);
//     } catch (error) {
//       console.log(error);
//       Sentry.captureException(error);
//     }
//   }
//   patchTitle(id, newObj) {
//     try {
//       return tasksRep.edittodo(id, newObj);
//     } catch (error) {
//       console.log(error);
//       Sentry.captureException(error);
//     }
//   }
//   patchStatus(id, newObj) {
//     try {
//       return tasksRep.edittodo(id, newObj);
//     } catch (error) {
//       console.log(error);
//       Sentry.captureException(error);
//     }
//   }
//   async deleteTodo(id) {
//     try {
//       return await tasksRep.removetodo(id);
//     } catch (error) {
//       console.log(error);
//       Sentry.captureException(error);
//     }
//   }
// }

class TodoService {
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
    const task = new TasksModel(data);
    const savedTasks = task.save();
    return savedTasks;
  }

  async getAll() {
    const tasks = await TasksModel.find();
    return tasks;
  }
}

module.exports = new TodoService();
