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
          name: "access_token",
        },
        CustomerAccessToken: {
          type: "apiKey",
          in: "header",
          name: "access_token",
        },
      },
    },
  },
  apis: ["./app/routes/**/*.js", "./app/databases/models/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
