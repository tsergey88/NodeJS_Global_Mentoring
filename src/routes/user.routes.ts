import { Router } from 'express';
import createError from 'http-errors';

import UserController from '../controllers/user.controller'

const userRouter = Router();
const userController: UserController = new UserController();

userRouter.route('/')
  .get(userController.getAllUsers)
  .post(userController.addUser)
  .all(() => { throw createError(501, 'Not Implemented') });

userRouter.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.removeUserById)
  .all(() => { throw createError(501, 'Not Implemented') });

// userRouter.route('/:id')

export default userRouter;
