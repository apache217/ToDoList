const TasksService = require("../services/tasksMongoose.services");

class TasksMongooseController {
  async getTasks(req, res) {
    let result = await TasksService.getTasks();
    return res.status(200).send(result);
  }
  async addTask(req, res) {
    let result = await TasksService.addTask(req.body);
    return res.status(200).send(result);
  }
}

module.exports = new TasksMongooseController();
