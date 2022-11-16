const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const authRoutes = require(`./auth.routes`);
const AuthService = require(`../services/auth.service`);
const TodoService = require(`../services/todo.service`);
const authenticateToken = require("../middleware/auth");

router.use(authenticateToken, async (req, res, next) => {
  console.log(req.headers);
  const users = await AuthService.getAll();
  const todos = await TodoService.getAll();
  if (todos && users) {
    req.todos = todos;
    req.users = users;
    next();
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB!!!" });
});

router.use("/", todoRoutes);
router.use("/", authRoutes);

module.exports = router;
