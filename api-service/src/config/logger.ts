import winston from "winston";
import path from "path";
import fs from "fs";

const logDir = path.resolve("logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }
    ),
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({filename: path.join(logDir, "combined.log")}),
    new winston.transports.File({filename: path.join(logDir, "error.log"), level: "error"}),
  ],
});

export default logger;