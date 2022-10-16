const fs = require("fs");
const Sentry = require("@sentry/node");

class TodoService {
  getOneUser(login) {
    return new Promise((res, rej) => {
      try {
        fs.readFile("./data.json", (err, data) => {
          if (err) {
            return res(false);
          }
          const filtredUser = JSON.parse(data).find(
            (item) => item.login === login
          );
          return res(filtredUser);
        });
      } catch (err) {
        console.log(err);
        Sentry.captureException(err);
      }
    });
  }
  getTodos() {
    try {
      return new Promise((res, rej) => {
        fs.readFile("./data.json", "utf8", (error, data) => {
          if (error) {
            Sentry.captureException(error);
            throw error;
          }
          return res(JSON.parse(data));
        });
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  postTodo(data) {
    try {
      return new Promise((res, rej) => {
        fs.writeFile(
          "./data.json",
          JSON.stringify(data, null, 2),
          (error, data) => {
            if (error) {
              Sentry.captureException(error);
              throw error;
            }
            return res(true);
          }
        );
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchTitle(data) {
    try {
      return new Promise((res, rej) => {
        fs.writeFile(
          "./data.json",
          JSON.stringify(data, null, 2),
          (error, data) => {
            if (error) {
              Sentry.captureException(error);
              throw error;
            }
            return res(true);
          }
        );
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchStatus(data) {
    try {
      return new Promise((res, rej) => {
        fs.writeFile(
          "./data.json",
          JSON.stringify(data, null, 2),
          (error, data) => {
            if (error) {
              Sentry.captureException(error);
              throw error;
            }
            return res(true);
          }
        );
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  deleteTodo(data) {
    try {
      return new Promise((res, rej) => {
        fs.writeFile(
          "./data.json",
          JSON.stringify(data, null, 2),
          (error, data) => {
            if (error) {
              Sentry.captureException(error);
              throw error;
            }
            return res(true);
          }
        );
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
}

module.exports = new TodoService();
