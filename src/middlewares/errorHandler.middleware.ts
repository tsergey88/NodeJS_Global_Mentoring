import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { winstonLogger } from './winstonLogger.middleware';

export const errorHandler = ((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err && err.error && err.error.isJoi) {
    status = 400;
    message = err.error.toString();
  }

  res.status(status).json({ status, message });
});