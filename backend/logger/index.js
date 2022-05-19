// eslint-disable-next-line no-unused-vars
const { transport } = require("winston");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
