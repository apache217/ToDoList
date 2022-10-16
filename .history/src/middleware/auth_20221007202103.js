const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.status(401).send("Для работы нужен токен!");
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new Error("invalid token");
        req.user = user;
        next();
      });
    }
  } catch (err) {
    res.status(403).send(err.message);
  }
};

module.exports = authenticateToken;
