const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const todoRoutes = require(`./todo.routes`);

router.use(`/`, todoRoutes);

module.exports = router;