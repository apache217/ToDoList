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
   *  get:
   *      summary: Get tasks of a current user
   *      description:
   *          Returns all the tasks for authentificated user.
   *      tags:
   *          - Tasks
   *      security:
   *          - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful response
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                example: [array with objects]
   *        400:
   *          description: Bad request
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Bad request"
   *        404:
   *          description: Not found
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "User not found!"
   */
  .get(`/todos`, authenticateToken, todoController.getTodos)

  /**
   * @swagger
   * /api/todo:
   *  post:
   *      summary: Add a new task
   *      description:
   *          Add a new task with title and isCompleted properties
   *      tags:
   *          - Tasks
   *      security:
   *          - bearerAuth: []
   *      requestBody:
   *        $ref: "#/components/requestBodies/Task_posting"
   *      responses:
   *        200:
   *          description: Successful response
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "New task created!"
   *        400:
   *          description: Bad request
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Bad request"
   *        404:
   *          description: Not found
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "User not found!"
   *        500:
   *          description: Internal Server Error
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Not written!"
   * components:
   *   requestBodies:
   *     Task_posting:
   *       description: Task object
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Go to school
   *                 description: text in the task
   *               isCompleted:
   *                 type: boolean
   *                 example: true
   *                 description: shows status of the task (done or not)
   *     required:
   *      - title
   *      - isCompleted
   */
  .post(`/todo/`, authenticateToken, todoController.postTodo)

  /**
   * @swagger
   * /api/todo/{id}:
   *  patch:
   *      summary: Patches the task's title
   *      description:
   *          Changes task's title by task's {id}
   *      tags:
   *          - Tasks
   *      security:
   *          - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: {id}
   *          required: true
   *          description: id of the task
   *          type: string      
   *      requestBody:
   *        $ref: "#/components/requestBodies/Task_title_patching"
   *      responses:
   *        200:
   *          description: Successful response
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Title is changed!"
   *        400:
   *          description: Bad request
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Bad request"
   *        404:
   *          description: Not found
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Task is not found!"
   *        500:
   *          description: Internal Server Error
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Title is not changed!"
   * components:
   *   requestBodies:
   *     Task_title_patching:
   *       description: changes task's title by task's id
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Go to school
   *     required:
   *      - title
   */
  .patch(`/todo/:id`, authenticateToken, todoController.patchTitle)

  /**
   * @swagger
   * /api/todo/{id}:
   *  patch:
   *      summary: Patches the task's status
   *      description:
   *          Changes task's status by task's {id}
   *      tags:
   *          - Tasks
   *      security:
   *          - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: {id}
   *          required: true
   *          description: id of the task
   *          type: string      
   *      requestBody:
   *        $ref: "#/components/requestBodies/Task_status_patching"
   *      responses:
   *        200:
   *          description: Successful response
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Status is changed!"
   *        400:
   *          description: Bad request
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Bad request"
   *        404:
   *          description: Not found
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "Status is not found!"
   *        500:
   *          description: Internal Server Error
   *          content:
   *            application/json:
   *              schema:
   *                type: string
   *                example: "tatus is not changed!"
   * components:
   *   requestBodies:
   *     Task_status_patching:
   *       description: changes task's status by task's id
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Go to school
   *     required:
   *      - title
   */
  .patch(`/todo/isCompleted/:id`, authenticateToken, todoController.patchStatus)

  /**
   * @swagger
   * /api/todo/{id}:
   *    delete:
   *      summary: Deletes the task
   *      description:
   *          Deletes the task by {id}
   *      tags:
   *          - Tasks
   *      security:
   *          - bearerAuth: []
   *      parameters:
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
   *              example: "Task is removed!"
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
   *            example: "Task is not removed!"
   */
  .delete(`/todo/:id`, authenticateToken, todoController.deleteTodo);

module.exports = router;
