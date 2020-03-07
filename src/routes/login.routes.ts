import { Router } from 'express';
import createError from 'http-errors';

import { UserController } from '../controllers';

export const loginRouter = Router();
const userController: UserController = new UserController();

loginRouter.route('/')
  .post(userController.loginUser)
  .all(() => { throw createError(501, 'Not Implemented') });

export default loginRouter;
