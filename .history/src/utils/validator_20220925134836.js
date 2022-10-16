const { body, param } = require("express-validator");

class Validator {
  validatePost(req) {
    return [
      body("login")
        .isEmail()
        .normalizeEmail()
        .withMessage("Логин должен быть e-mail"),
      body("password")
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        })
        .withMessage(
          "Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 цифру и специальный символ"
        ),
    ];
  }
}

module.exports = new Validator();
