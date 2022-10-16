const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);
const authRoutes = require("./auth.routes");

router.use("/", todoRoutes);
router.use("/", authRoutes);

module.exports = router;