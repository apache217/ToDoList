const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const authRoutes = require(`./auth.routes`);
const AuthService = require(`../services/auth.service`);
const TodoService = require(`../services/todo.service`);
const authenticateToken = require("../middleware/auth");

router.use(async (req, res, next) => {
  const users = await AuthService.getAll();
  if (users) {
    req.users = users;
    next();
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB!!!" });
});

router.use("/", authRoutes);

router.use(authenticateToken, async (req, res, next) => {
  const todos = await TodoService.getAll(req.user._id);
  if (todos) {
    req.todos = todos;
    next();
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB!!!" });
});

router.use("/", todoRoutes);

module.exports = router;
