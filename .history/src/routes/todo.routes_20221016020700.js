const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/todo.controller`);
const TodoService = require(`../services/todo.service`);

const authenticateToken = require("../middleware/auth");

router.use(async (req, res, next) => {
  let data = await TodoService.getTodos();
  if (data) {
    req.todos = data.todos;
    req.users = data.users;
    next();
  } else
    return res
      .status(500)
      .send({ message: "Error while getting data from DB" });
});

router
  /**
   * @swagger
   * /api/todos:
   *    pogetst:
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
   *            $ref: '#/definitions/Users_register'
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
   *   Users_register:
   *     description: User object
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
   *     required:
   *      - login
   *      - password
   *      - name
   *      - age
   *      - isMan
   *      - city
   */
  .get(`/todos`, authenticateToken, todoController.getTodos)
  .post(`/todo/`, authenticateToken, todoController.postTodo)
  .patch(`/todo/:id`, authenticateToken, todoController.patchTitle)
  .patch(`/todo/isCompleted/:id`, authenticateToken, todoController.patchStatus)
  .delete(`/todo/:id`, authenticateToken, todoController.deleteTodo);

module.exports = router;
