import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

export const authenticateJWT = ((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw createError(401, 'Unauthorized Error');
  }

  jwt.verify(token, process.env.TOKEN_SECRET, err => {
    if (err) {
      throw createError(403, 'Forbidden Error');
    }

    next()
  });
});