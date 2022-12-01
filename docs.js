require("dotenv").config();
const { SERVER_URL } = process.env;
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Binar Car Rental",
      version: "1.0",
    },
    servers: [{ url: SERVER_URL }],
    components: {
      securitySchemes: {
        AdminAccessToken: {
          type: "apiKey",
          in: "header",
          name: "accessToken",
        },
        CustomerAccessToken: {
          type: "apiKey",
          in: "header",
          name: "accessToken",
        },
      },
    },
  },
  apis: ["./app/routes/**/*.js", "./app/databases/models/**/*.js"],
};
const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;