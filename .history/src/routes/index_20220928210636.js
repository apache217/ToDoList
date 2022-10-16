const express = require(`express`);
const router = express.Router();
const todoRoutes = require(`./todo.routes`);

router.use(`/`, todoRoutes);
router.use("/auth", authRoutes);

module.exports = router;