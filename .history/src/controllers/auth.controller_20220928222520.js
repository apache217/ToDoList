const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TodoServices = require("../services/todo.service");

class AuthControllers {
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
          throw new Error("Пароль не правильный!");
        }
      } else {
        throw new Error("Такого пользователя нет!");
      }
    } catch (err) {
      res.send({ message: err.message });
    }
  }
}

module.exports = new AuthControllers();
