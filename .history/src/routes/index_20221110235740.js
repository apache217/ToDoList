const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const authRoutes = require(`./auth.routes`);
const AuthService = require(`../services/auth.service`);
const TodoService = require(`../services/todo.service`);

router.use("/", todoRoutes);
router.use("/", authRoutes);

router.use(async (req, res, next) => {
  const users = await AuthService.getAll();
  const todos = await TodoService.getAll();
  // console.log(!!users)
  if (todos && users) {
    req.todos = todos;
    req.users = users;
    next();
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB!!!" });
});

module.exports = router;
