const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TodoServices = require("../services/todo.service");
const AuthService = require("../services/auth.service");
const uuid = require("uuid");
const saltRounds = 10;

class AuthControllers {
  async register(req, res) {
    try {
      const result = {};
      const login_check = req.users.find(
        (item) => item.login === req.body.login
      );
      if (!login_check) {
        req.body.idUser = uuid.v1();
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
          req.body.password = hash;
          req.users.push(req.body);
          result.users = req.users;
          result.todos = req.todos;
          const register = await AuthService.postUser(result);
          register
            ? res.status(200).send("Новый пользователь зарегистрирован!")
            : res
                .starus(500)
                .send("Ошибка при регистрации нового пользователя!");
        });
      }
      if (login_check) {
        res.status(500).send("Такой пользователь уже существует!");
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
  async login(req, res) {
    try {
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
          throw new Error("Введены логин или пароль неправильны!");
        }
      } else {
        throw new Error("Введены логин или пароль неправильны");
      }
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
}

module.exports = new AuthControllers();
