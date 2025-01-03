import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (error: AppError | Error, _req: Request, res: Response, next: NextFunction) => {
  if (!error) return next();

  logger.error({
    message: error.message,
    stack: error.stack,
    ...(error instanceof AppError ? { statusCode: error.statusCode, errors: error.errors } : {}),
  });

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors || null,
    });
  }

  return res.status(500).json({
    message: "Something went wrong",
  });
};
