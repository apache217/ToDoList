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
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB" });
});

router
  .use(authenticateToken)
  .get(`/todo`, todoController.getTodos)
  .post(`/todo/`, todoController.postTodo)
  .patch(`/todo/:id`, todoController.patchTitle)
  .patch(`/todo/isCompleted/:id`, todoController.patchStatus)
  .delete(`/todo/:id`, todoController.deleteTodo);

module.exports = router;
