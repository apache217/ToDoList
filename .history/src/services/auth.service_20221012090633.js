const fs = require("fs");
const Sentry = require("@sentry/node");

class AuthService {
  postUser(data) {
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

module.exports = new AuthService();
