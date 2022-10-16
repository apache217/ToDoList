const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/todo.controller`);
const TodoService = require(`../services/todo.service`);
const Validator = require("../utils/validator");

const authenticateToken = require("../middleware/auth");

router.use(async (req, res, next) => {
  let data = await TodoService.getTodos();
  if (data) {
    req.todos = data.todos;
    req.users = data.users;
    next();
  } else return res.status(500).send({ message: "Error while getting data" });
});

// router
//   .get(`/todos`, todoController.getTodos);

router
  .get(`/todos`, todoController.getTodos)
  .post(`/todo/`, todoController.postTodo)
  .patch(`/todo/:id`, todoController.patchTitle)
  .patch(`/todo/isCompleted/:id`, todoController.patchStatus)
module.exports = router;
