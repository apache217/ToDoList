const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const TodoServices = require("../services/todo.service");
const AuthService = require("../services/auth.service");
const uuid = require("uuid");
const Sentry = require("@sentry/node");
const saltRounds = 10;

class AuthControllers {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      console.log(errors);
      Sentry.captureException(errors);
      if (!errors.isEmpty()) {
        console.log("--Error--");
        return res.status(400).send({
          success: false,
          errors: errors.array(),
        });
      } else {
        console.log("--createUser--");
        const result = {};
        const login_check = req.users.find(
          (item) => item.login === req.body.login
        );
        if (!login_check) {
          req.body.idUser = uuid.v1();
          bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            req.body.password = hash;
            req.body.isAdmin = false;
            req.users.push(req.body);
            result.users = req.users;
            result.todos = req.todos;
            const register = await AuthService.postUser(result);
            register
              ? res.status(200).send("New user is created!")
              : res.starus(500).send("Unable to create user!");
          });
        }
        if (login_check) {
          res.status(409).send("User already exists!");
        }
      }
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
  async login(req, res) {
    try {
      const errors = validationResult(req);
      console.log(errors);
      Sentry.captureException(errors);
      if (!errors.isEmpty()) {
        console.log("--Error--");
        return res.status(400).send({
          success: false,
          errors: errors.array(),
        });
      } else {
        console.log("--loginUser--");
        const { login, password } = req.body;
        const user = await TodoServices.getOneUser(login);
        console.log(user);
        if (user) {
          const compareUser = await bcrypt.compare(password, user.password);
          const { login } = user;
          if (compareUser) {
            const token = jwt.sign({ login }, process.env.ACCESS_TOKEN_SECRET);
            res.send({ token });
          } else {
            throw new Error("Incorrect username or password!");
          }
        } else {
          throw new Error("Internal server error!");
        }
      }
    } catch (err) {
      Sentry.captureException(err);
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = new AuthControllers();


// paths:
//   /pets:
//     post:
//       summary: Add a new pet
//       requestBody:
//         description: Optional description in *Markdown*
//         required: true
//         content:
//           application/json:
//             schema:
//               $ref: '#/components/schemas/Pet'
//           application/xml:
//             schema:
//               $ref: '#/components/schemas/Pet'
//           application/x-www-form-urlencoded:
//             schema:
//               $ref: '#/components/schemas/PetForm'
//           text/plain:
//             schema:
//               type: string
//       responses:
//         '201':
//           description: Created


// components:
//   schemas:
//     Message:
//       title: A Slack message
//       type: object
//       properties:
//         text:
//           type: string
//           description: Message text
//       required:
//         - text