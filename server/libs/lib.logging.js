const winston = require("winston");

const LOG_ERROR = 'error';
const LOG_WARN = 'warn';
const LOG_INFO = 'info';


const Logging = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = {
  Logging,
  LOG_ERROR,
  LOG_INFO,
  LOG_WARN
}