const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const Validator = require("../utils/validator");

router
  /**
   * @swagger
   * /api/register:
   *    post:
   *      summary: Add new user
   *      description:
   *          Register 'User' object. User ID creates automatically while posting the user.
   *      tags:
   *          - Users
   *      parameters:
   *        - name: user
   *          in: body
   *          description: user object
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Users'
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return String
   *              type: string
   *              example: "New user is created!"
   *        400:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Bad request"
   *        409:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "User already exists!"
   *        500:
   *          description: Error
   *          schema:
   *            type: string
   *            example: "Unable to create user!"
   * definitions:
   *   Users:
   *     description: Users object
   *     properties:
   *       login:
   *         type: string
   *         example: example@example.com
   *         description: login for user
   *       password:
   *         type: string
   *         example: Pa$$word1!
   *         description: password of user
   *       name:
   *         type: string
   *         example: Vlad
   *         description: name of user
   *       age:
   *         type: number
   *         example: 24
   *         description: age of user
   *       isMan:
   *         type: boolean
   *         example: true
   *         description: man or woman
   *       city:
   *         type: string
   *         example: "Minsk"
   *         description: city of user
   *       isAdmin:
   *         type: boolean
   *         example: false
   *         description: admin or not
   *     required:
   *      - login
   *      - password
   *      - name
   *      - age
   *      - isMan
   *      - city
   *      - isAdmin
   */
  .post("/register", Validator.validatePost(), AuthController.register)
  /**
   * @swagger
   * /api/login:
   *  post:
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
