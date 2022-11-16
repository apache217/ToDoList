const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./src/routes/index");
const Sentry = require("@sentry/node");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require(`dotenv`).config();

app.use(bodyParser.json());
app.use(Sentry.Handlers.requestHandler());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      description: "To Do List with mongoose",
      servers: ["http://localhost:3000"],
      version: "1.1.1",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Sentry.init({
  dsn: "https://36a5ee6a068e4b3eadfa062b2c0eb25a@o1404093.ingest.sentry.io/6737022",
});

app.use("/api", routes);
app.use(Sentry.Handlers.errorHandler());

const db = mongoose.connect(
  `${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB_NAME}`,
  () => console.log("Connected to MongoDB")
);

db.then((data) => console.log(data), (data) => console.log(data));

app.listen(process.env.PORT, () => {
  console.log(
    `---Server started---
    PORT: ${process.env.PORT}`
  );
});
