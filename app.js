if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("dotenv").config();

const { SERVER_HOST, SERVER_PORT } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./app/routes");
const fileUpload = require("express-fileupload");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./doc");

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(cors());

app.get("/docs.json", (req, res) => res.json(swaggerDocs));
app.use("/api-docs", swaggerUI.serve);
app.use("/api-docs", swaggerUI.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.status(200).json({
    name: true,
    message: "Welcome to Binar Rental CAR API!",
  });
});

app.use(fileUpload({ limit: "2mb" }));
app.use(router);

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(
    `\x1b[32m[nodemon] starting server on ${SERVER_HOST}:${SERVER_PORT}\x1b[0m`
  );
});

module.exports = app;
