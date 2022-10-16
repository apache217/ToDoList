const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const Validator = require("../utils/validator");


router
.post("/register", Validator.validatePost(), AuthController.register)
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
.post("/login", Validator.validatePost(), AuthController.login);

module.exports = router;
