const express = require(`express`);

class getIdUser (req, res, next) => {
    if (req.headers.authorization) {
      req.token = req.headers.authorization.split(` `)[1];
      login = jwt.decode(req.token).login;
      idUser = req.users.find((item) => item.login === login).idUser;
      if (!idUser) {
        res.status(404).send("User not found!");
      } else {
        next();
      }
    }
  });