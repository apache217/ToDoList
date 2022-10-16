const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/users.controller`);
const TodoService = require(`../services/users.service`);
// const Validator = require("../utils/validator");

router.use(async (req, res, next) => {
  let data = await TodoService.getUsers();

  if (data) {
    req.todo = data;
    next();
  } else return res.status(500).send({ message: "Error while getting todo's" });
});

router
.get(`/`, UserController.getUsers)