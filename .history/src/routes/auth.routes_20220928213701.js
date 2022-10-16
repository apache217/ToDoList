const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controllers");
const Validator = require("../utils/validator");

/**
 * @swagger
 * /api/login:
 *  get:
 *      summary: Логин
 *      description: Returns all users from DB
 *      tags:
 *          - Users
 *      responses:
 *          '200':
 *              description: Successfull response
 */
router
.post("/register", AuthController.register)
.post("/login", AuthController.login);

module.exports = router;
