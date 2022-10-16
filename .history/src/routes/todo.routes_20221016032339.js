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
   *              example: [array with objects]
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
   *   Users_token:
   *     description: User's token
   *     properties:
   *       token:
   *         type: string
   *         example: 87gyhuijo9p.9876tghjki76.87ytghjiow
   *         description: JSON web access token
   */
  .get(`/todos`, authenticateToken, todoController.getTodos)

  /**
   * @swagger
   * /api/todo:
   *    post:
   *      summary: Add a new task
   *      description:
   *          Add a new task with title and isCompleted properties
   *      tags:
   *          - Tasks
   *      parameters:
   *        - name: task
   *          in: body
   *          description: task object
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Task_posting'
   *        - name: access token
   *          in: headers.authorization
   *          description: access token
   *          required: true
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return String
   *              type: string
   *              example: "New task created!"
   *        400:
   *          description: Bad request
   *          schema:
   *            type: string
   *            example: "Bad request"
   *        404:
   *          description: Not found
   *          schema:
   *            type: string
   *            example: "User not found!"
   *        500:
   *          description: Internal Server Error
   *          schema:
   *            type: string
   *            example: "Not written!"
   * definitions:
   *   Task_posting:
   *     description: Task object
   *     properties:
   *       title:
   *         type: string
   *         example: Go to school
   *         description: text in the task
   *       isCompleted:
   *         type: boolean
   *         example: true
   *         description: shows status of the task (done or not)
   *     required:
   *      - title
   *      - isCompleted
   */
  .post(`/todo/`, authenticateToken, todoController.postTodo)

  /**
   * @swagger
   * /api/todo/:id:
   *    patch:
   *      summary: Patches the task's title
   *      description:
   *          Changes task's title by task's id and access token
   *      tags:
   *          - Tasks
   *      parameters:
   *        - name: title
   *          in: body
   *          description: task title
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Task_tite_patching'
   *        - name: access token
   *          in: headers.authorization
   *          description: access token
   *          required: true
   *        - in: path
   *          name: id
   *          required: true
   *          description: id of the task
   *          type: string
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return String
   *              type: string
   *              example: "Title is changed!"
   *        400:
   *          description: Bad request
   *          schema:
   *            type: string
   *            example: "Bad request"
   *        404:
   *          description: Not found
   *          schema:
   *            type: string
   *            example: "Task is not found!"
   *        500:
   *          description: Internal Server Error
   *          schema:
   *            type: string
   *            example: "Title is not changed!"
   * definitions:
   *   Task_tite_patching:
   *     description: changes task's title by task's id and access token
   *     properties:
   *       title:
   *         type: string
   *         example: Go to school
   *     required:
   *      - title
   */
  .patch(`/todo/:id`, authenticateToken, todoController.patchTitle)

  /**
   * @swagger
   * /api/isCompleted/:id:
   *    patch:
   *      summary: Patches the task's status
   *      description:
   *          Changes task's status by task's id and access token
   *      tags:
   *          - Tasks
   *      parameters:
   *        - name: title
   *          in: body
   *          description: task status
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Task_ststus_patching'
   *        - name: access token
   *          in: headers.authorization
   *          description: access token
   *          required: true
   *        - in: path
   *          name: id
   *          required: true
   *          description: id of the task
   *          type: string
   *      responses:
   *        200:
   *          description: Successful response
   *          schema:
   *              title: Return String
   *              type: string
   *              example: "Title is changed!"
   *        400:
   *          description: Bad request
   *          schema:
   *            type: string
   *            example: "Bad request"
   *        404:
   *          description: Not found
   *          schema:
   *            type: string
   *            example: "Task is not found!"
   *        500:
   *          description: Internal Server Error
   *          schema:
   *            type: string
   *            example: "Title is not changed!"
   * definitions:
   *   Task_patching:
   *     description: changes task's title by task's id and access token
   *     properties:
   *       title:
   *         type: string
   *         example: Go to school
   *     required:
   *      - title
   */
  .patch(`/todo/isCompleted/:id`, authenticateToken, todoController.patchStatus)
  .delete(`/todo/:id`, authenticateToken, todoController.deleteTodo);

module.exports = router;
