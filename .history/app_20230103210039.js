const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const cors = require("cors");
const { Sequelize } = require("sequelize");
const routes = require("./src/routes/index");
const Sentry = require("@sentry/node");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

app.use(bodyParser.json());
app.use(Sentry.Handlers.requestHandler());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      description: "To Do List with PostgreSQL",
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

// async function main() {
//   const pool = new Pool();
//   const client = await pool.connect();
//   client.release();
// }

// main();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: 5433,
//   database: process.env.DATABASE,
// });

// pool.connect();
// pool.query("SELECT * FROM USERS", (err, result) => {
//   if (!err) {
//     console.log(result);
//   } else {
//     console.log(err);
//   }
// });
// pool.end();

console.table([
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.PASSWORD,
  process.env.HOST,
  process.env.DIALECT,
]);

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => console.log("error -> ", err.message));

app.listen(process.env.PORT, () => {
  console.log(
    `---Server started---
    PORT: ${process.env.PORT}`
  );
});
