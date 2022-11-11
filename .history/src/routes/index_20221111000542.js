const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const authRoutes = require(`./auth.routes`);
const AuthService = require(`../services/auth.service`);
const TodoService = require(`../services/todo.service`);

router.use("/", todoRoutes);
router.use("/", authRoutes);

module.exports = router;
