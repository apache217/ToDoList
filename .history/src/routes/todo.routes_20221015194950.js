const express = require(`express`);
const router = express.Router();
const todoController = require(`../controllers/todo.controller`);
const TodoService = require(`../services/todo.service`);
const Validator = require("../utils/validator");

const authenticateToken = require("../middleware/auth");

router
  .use(async (req, res, next) => {
    let data = await TodoService.getTodos();
    if (data) {
      req.todos = data.todos;
      req.users = data.users;
      next();
    } else
      return res
        .status(500)
        .send({ message: "Error while getting data from DB" });
  })
  .use((req, res, next) => {
    let { login, password } = req.body;
    if (login && password) {
      Validator.validatePost();
    }
  });
// .use((req, res, next) => {
//   if (req.headers.authorization) {
//     req.token = req.headers.authorization.split(` `)[1];
//     login = jwt.decode(req.token).login;
//     idUser = req.users.find((item) => item.login === login).idUser;
//     if (!idUser) {
//       res.status(404).send("User not found!");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

router
  .get(`/todo`, authenticateToken, todoController.getTodos)
  .post(`/todo/`, authenticateToken, todoController.postTodo)
  .patch(`/todo/:id`, authenticateToken, todoController.patchTitle)
  .patch(`/todo/isCompleted/:id`, authenticateToken, todoController.patchStatus)
  .delete(`/todo/:id`, authenticateToken, todoController.deleteTodo);

module.exports = router;
