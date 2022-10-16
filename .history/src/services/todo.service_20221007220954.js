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
        fs.readFile("./data.json", "utf8", function (error, data) {
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
        let content_ = fs.readFileSync("./data.json", "utf8");
        let content = JSON.parse(content_);
        content.todos.push(data);
        fs.writeFyleSync("./data.json", JSON.stringify(content));
        res(fs.readFileSync("./data.json", "utf8"));
        // return new Promise((res, rej) => {
        //   fs.writeFile(
        //     "./data.json",
        //     JSON.stringify(content),
        //     function (error, content) {
        //       if (error) {
        //         Sentry.captureException(error);
        //         throw error;
        //       }
        //       return res(JSON.stringify(content));
        //     }
        //   );
        // });
      });
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
    }
  }
  patchTitle(data) {
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
  patchStatus(data) {
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
  deleteTodo(data) {
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
