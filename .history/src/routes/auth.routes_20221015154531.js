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
   *      description: Adds new user
   *      tags:
   *          - Users
   *      consumes:
   *          - application/json
   *      parameters:
   *        - in: body
   *          name: min
   *          required: true
   *          description: Set {min} age for users to return
   *          type: integer
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return Array
   *              type: object
   *              example: array
   *        404:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "User not found."
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
