import { Request, Response, NextFunction } from 'express';

export const consoleLogger = ((req: Request, res: Response, next: NextFunction) => {
  console.log('Method ',req.method, ':', req.originalUrl, req.body, req.query);
});