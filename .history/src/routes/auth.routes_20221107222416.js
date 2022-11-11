const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthService = require(`../services/auth.service`);
const Validator = require("../utils/validator");

router.use(async (req, res, next) => {
  const users = await AuthService.getAll();
  // if (data.todos && data.users) {
  req.users = users[0].users;
  console.log(req.users);
  next();
  // } else
  //return res
  //.status(500)
  //.send({ message: "Error while getting data from DB!!!" });
});

router
  /**
   * @swagger
   * /api/register:
   *  post:
   *      summary: Adds new user
   *      description:
   *          Register 'User' object. User ID creates automatically while posting the user.
   *      tags:
   *          - Users
   *      requestBody:
   *        $ref: "#/components/requestBodies/Users_register"
   *      responses:
   *        200:
   *          description: Successful response
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "New user is created!"
   *        400:
   *          description: Bad request
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Bad request"
   *        409:
   *          description: Conflict
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "User already exists!"
   *        500:
   *          description: Internal Server Error
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Unable to create user!"
   * components:
   *   requestBodies:
   *     Users_register:
   *       description: User object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               login:
   *                 type: string
   *                 example: example@example.com
   *                 description: login for user
   *               password:
   *                 type: string
   *                 example: Pa$$word1!
   *                 description: password of user
   *               name:
   *                 type: string
   *                 example: Vlad
   *                 description: name of user
   *               age:
   *                 type: number
   *                 example: 24
   *                 description: age of user
   *               isMan:
   *                 type: boolean
   *                 example: true
   *                 description: man or woman
   *               city:
   *                 type: string
   *                 example: "Minsk"
   *                 description: city of user
   *     required:
   *      - login
   *      - password
   *      - name
   *      - age
   *      - isMan
   *      - city
   */
  .post(
    "/register",
    Validator.validatePost(),
    Validator.validateUserData(),
    AuthController.register
  )

  /**
   * @swagger
   * /api/login:
   *  post:
   *      summary: Logs in a user
   *      description: Returns access token or error for unregistered user
   *      tags:
   *        - Users
   *      requestBody:
   *        $ref: "#/components/requestBodies/Users_login"
   *      responses:
   *        200:
   *          description: Successful response
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  token:
   *                    type: string
   *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjY1ODQwNzA5fQ.e3aet6kVgPjoC_7s-XB-84X0zrbo51fbBZO5KMeltyM"
   *        400:
   *          description: Bad request
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Incorrect username or password!"
   *        500:
   *          description: Internal Server Error
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Error while getting data from DB"
   * components:
   *   requestBodies:
   *     Users_login:
   *       description: User object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               login:
   *                 type: string
   *                 example: example@example.com
   *                 description: login for user
   *               password:
   *                 type: string
   *                 example: Pa$$word1!
   *                 description: password of user
   *     required:
   *      - login
   *      - password
   */
  .post("/login", Validator.validatePost(), AuthController.login);

module.exports = router;
