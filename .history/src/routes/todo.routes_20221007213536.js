const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/todo.controller`).default;
const TodoService = require(`../services/todo.service`);
const Validator = require("../utils/validator");

const authenticateToken = require("../middleware/auth");

router.use(async (req, res, next) => {
  let data = await TodoService.getTodos();

  if (data) {
    req.todos = data;
    next();
  } else return res.status(500).send({ message: "Error while getting data" });
});

// router
//   .get(`/todos`, todoController.getTodos);

router
  .get(`/todos`, todoController.getTodos)
  .post(`/postTodo`, todoController.postTodo);

module.exports = router;
