const fs = require("fs");
const Sentry = require("@sentry/node");

class TodoService {
  getTodos() {
    return new Promise((res, rej) => {
      try {
        fs.readFile("./data.json", "utf8", function (error, data) {
          if (error) {
            Sentry.captureException(error);
            throw error;
          }
          return res(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
  postTodo(data) {
    return new Promise((res, rej) => {
      try {
        fs.writeFile("./data.json", JSON.parse(data), function (error, data) {
          if (error) {
            Sentry.captureException(error);
            throw error;
          }
          return res(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
  postUser(data) {
    return new Promise((res, rej) => {
      try {
        fs.writeFile("./data.json", JSON.parse(data), function (error, data) {
          if (error) {
            Sentry.captureException(error);
            throw error;
          }
          return res(JSON.parse(data));
        });
      } catch (error) {
        console.log(error);
        Sentry.captureException(error);
      }
    });
  }
}

module.exports = new TodoService();
