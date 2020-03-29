import { Router } from 'express';
import createError from 'http-errors';

import { UserController } from '../controllers';
import { UserService } from '../services';
import { UserRepository } from '../repositories';

export const loginRouter = Router();
const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);
const userController: UserController = new UserController(userService);

loginRouter.route('/')
  .post(userController.loginUser)
  .all(() => { throw createError(501, 'Not Implemented') });

export default loginRouter;
