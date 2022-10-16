const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const bcrypt = require("bcrypt");
const uuid = require("uuid");

router.use(`/`, todoRoutes);

module.exports = router;