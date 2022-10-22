const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/todo.controller`);
const TodoService = require(`../services/todo.service`);
const Validator = require("../utils/validator");
const jwt = require("jsonwebtoken");

const authenticateToken = require("../middleware/auth");

router
  .use(async (req, res, next) => {
    let data = await TodoService.getTodos();
    if (data) {
      req.todos = data.todos;
      req.users = data.users;
      next();
    } else return res.status(500).send({ message: "Error while getting data" });
  })
  .use((req, res, next) => {
    if (req.headers.authorization) {
      req.token = req.headers.authorization.split(` `)[1];
      login = jwt.decode(req.token).login;
      idUser = req.users.find((item) => item.login === login).idUser;
      next();
    } else {
      next();
    }
  });

router
  .get(`/todos`, todoController.getTodos)
  .post(`/todo/`, todoController.postTodo)
  .patch(`/todo/:id`, todoController.patchTitle)
  .patch(`/todo/isCompleted/:id`, todoController.patchStatus)
  .delete(`/todo/:id`, todoController.deleteTodo);

module.exports = router;