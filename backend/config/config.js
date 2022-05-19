require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const db = process.env.DB;

module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: db,
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
  },
  test: {
    username: dbUser,
    password: dbPassword,
    database: db,
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
  },
  production: {
    username: dbUser,
    password: dbPassword,
    database: db,
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
  },
};
