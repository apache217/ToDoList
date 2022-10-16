const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TodoServices = require("../services/todo.service");
const AuthService = require("../services/auth.service");

class AuthControllers {
  async register(req, res) {
    try {
      const { login, password } = req.body;
      if (req.users.find((item) => item.login === req.body.login)) {}
        console.log(user);
      if (user) {
        const compareUser = await bcrypt.compare(password, user.password);
        const { login } = user;
        if (compareUser) {
          const token = jwt.sign({ login }, process.env.ACCESS_TOKEN_SECRET);
          res.send({ token });
        } else {
          throw new Error("Пароль неправильный!");
        }
      } else {
        throw new Error("Такого пользователя нет!");
      }
    } catch (err) {
      res.send({ message: err.message });
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
