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
 *      summary: Login
 *      description: Returns access token for 
 *      tags:
 *          - Users
 *      responses:
 *          '200':
 *              description: Successfull response
 *          '400':
 *              description: Bad request response
 */
.post("/login", Validator.validatePost(), AuthController.login);

module.exports = router;
