const { body, param } = require("express-validator");

class Validator {
  validatePost(req) {
    return [
      body("login")
        .exists()
        .isLength({ min: 3, max: 16 })
        .isEmail()
        .matches(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/)
        .normalizeEmail()
        .withMessage("Login must be e-mail"),
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
  validateUserData(req) {
    return [
      body("name")
        .isString()
        .matches(/^[a-zA-Z]+$/)
        .isLength({ min: 2, max: 16 })
        .withMessage("The name must be written in Latin"),
      body("age")
        .isNumeric()
        .matches(/^(?:1(?:00?|\d)|[2-5]\d|[6-9]\d?)$/)
        .withMessage("The age must be a number from 6 to 100"),
      body("isMan").isBoolean(),
      body("city")
        .isString()
        .isIn(["Minsk", "Warsaw", "Budapest", "Moscow", "Berlin", "Lisbon"]),
    ];
  }
}

module.exports = new Validator();
