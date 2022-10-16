const { body, param } = require("express-validator");

class Validator {
  validatePost(req) {
    return [
      body("login")
        .isEmail()
        .normalizeEmail()
        .withMessage("ЛLogin must be e-mail"),
      body("password")
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minUppercase: 1,
          minSymbols: 1,
        })
        .withMessage(
          "Password should contain at least 8 symbols with 1 capital letter, 1 number and a special symbol"
        ),
    ];
  }
  validateSN(requers) {
    return [
      body("instagram")
        .isLength({ min: 2, max: 16 })
        .matches(
          /@(?=.{5,64}(?:\s|$))(?![_])(?!.*[_]{2})[a-zA-Z0-9_]+(?<![_.])/gm
        )
        .withMessage("Put the correct Instagram profile starting with @"),
      body("telegram")
        .isLength({ min: 2, max: 16 })
        .withMessage("Put the correct Telegram profile starting with @"),
    ];
  }
  validateUserData(req) {
    return [
      body("name")
        .isString()
        .matches(/^[a-zA-Z]+$/)
        .isLength({ min: 2, max: 16 })
        .withMessage("The name must be written in Latin"),
      body("age")
        .isNumeric()
        .matches(/^[1-9]+$/)
        .withMessage("The age must be a number from 0 to 120"),
    ];
  }
}

module.exports = new Validator();
