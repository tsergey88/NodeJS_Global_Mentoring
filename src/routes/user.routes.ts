import createError from 'http-errors';
import { Router } from 'express';

const userRouter = Router();

userRouter.route('/')
  .get(() => {
    throw createError(400, 'User not found');
  });

export default userRouter;
