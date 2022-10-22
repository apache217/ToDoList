const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/todo.controller`);
const TodoService = require(`../services/todo.service`);
const Validator = require("../utils/validator");

router.use(async (req, res, next) => {
  let data = await TodoService.getTodos();

  if (data) {
    req.todos = data;
    next();
  } else return res.status(500).send({ message: "Error while getting todo's" });
});

router
.post(`/register`)
.get(`/todos`, todoController.getTodos);

module.exports = router;