const {
  PROD_DB_HOST,
  PROD_DB_PORT,
  PROD_DB_USER,
  PROD_DB_PASS,
  PROD_DB_NAME,
  PROD_DB_DIALECT,
  DEV_DB_HOST,
  DEV_DB_PORT,
  DEV_DB_USER,
  DEV_DB_PASS,
  DEV_DB_NAME,
  DEV_DB_DIALECT,
} = process.env;

module.exports = {
  development: {
    username: DEV_DB_USER,
    password: DEV_DB_PASS,
    database: DEV_DB_NAME,
    host: DEV_DB_HOST,
    port: DEV_DB_PORT,
    dialect: DEV_DB_DIALECT,
  },

  production: {
    username: PROD_DB_USER,
    password: PROD_DB_PASS,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    port: PROD_DB_PORT,
    dialect: PROD_DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
