const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const authRoutes = require(`./auth.routes`);
const AuthService = require(`../services/auth.service`);
const TodoService = require(`../services/todo.service`);

router.use(async (req, res, next) => {
  const users = await AuthService.getAll();
  const todos = await TodoService.getAll();
  if (todos && users) {
    req.todos = todos;
    req.users = users;
    console.log(req.todos);
    next();
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB!!!" });
});

router.use("/", todoRoutes);
router.use("/", authRoutes);

module.exports = router;
