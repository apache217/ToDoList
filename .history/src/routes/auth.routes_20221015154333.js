const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const Validator = require("../utils/validator");

router
/**
   * @swagger
   * /api/register:
   *  get:
   *      summary: Registration
   *      description: Returns access token for registered user or error for unregistreted user
   *      tags:
   *          - Users
   *      parameters:
   *        - name: user
   *          in: body
   *          description: user object
   *          required: true
   *          schema:
   *            
   *      responses:
   *          '200':
   *              description: Successfull response
   *          '400':
   *              description: Bad request response
   */
  .post("/register", Validator.validatePost(), AuthController.register)
  /**
   * @swagger
   * /api/login:
   *  get:
   *      summary: Login
   *      description: Returns access token for registered user or error for unregistreted user
   *      tags:
   *          - Users
   *      parameters:
   *        - name: user
   *          in: body
   *          description: user object
   *          required: true
   *          schema:
   *            
   *      responses:
   *          '200':
   *              description: Successfull response
   *          '400':
   *              description: Bad request response
   */
  .post("/login", Validator.validatePost(), AuthController.login);

module.exports = router;
