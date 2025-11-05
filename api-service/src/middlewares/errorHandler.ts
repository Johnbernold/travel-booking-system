import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import logger from "../config/logger.js";

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  //console.error("❌ Error:", err);

  let status = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
  }

  res.status(status).json({
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });

  logger.error("❌ Error:", err);

  
};