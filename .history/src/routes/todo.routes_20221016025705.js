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
   *    get:
   *      summary: Get tasks of a current user
   *      description:
   *          Returns all the tasks for authentificated user.
   *      tags:
   *          - Tasks
   *      parameters:
   *        - name: access token
   *          in: headers.authorization
   *          description: access token
   *          required: true
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              type: array
   *              example: array
   *        400:
   *          description: Bad request
   *          schema:
   *              type: string
   *              example: Bad request
   *        404:
   *          description: Not found
   *          schema:
   *              type: string
   *              example: User not found!
   * definitions:
   *   user's_token:
   *     description: User's token
   *     properties:
   *       token:
   *         type: string
   *         example: 87gyhuijo9p.9876tghjki76.87ytghjiow
   *         description: JSON web access token
   */
  .get(`/todos`, authenticateToken, todoController.getTodos)
  .post(`/todo/`, authenticateToken, todoController.postTodo)
  .patch(`/todo/:id`, authenticateToken, todoController.patchTitle)
  .patch(`/todo/isCompleted/:id`, authenticateToken, todoController.patchStatus)
  .delete(`/todo/:id`, authenticateToken, todoController.deleteTodo);

module.exports = router;
