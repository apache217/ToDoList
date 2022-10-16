const express = require(`express`);
const router = express.Router();
const usersRoutes = require(`./users.routes`);
const todoRoutes = require(`./todo.routes`);

router.use(`/users`, usersRoutes);
router.use(`/todo`, todoRoutes);

module.exports = router;