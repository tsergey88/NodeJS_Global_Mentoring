import { Router } from 'express';
import createError from 'http-errors';
import { createValidator } from 'express-joi-validation';

import { UserController } from '../controllers';
import { userValidateModel } from '../models/user.model';

export const userRouter = Router();
const userController: UserController = new UserController();
const validator = createValidator({passError: true});

userRouter.route('/')
  .get(userController.getAllUsers)
  .post(validator.body(userValidateModel), userController.addUser)
  .all(() => { throw createError(501, 'Not Implemented') });

userRouter.route('/:id')
  .get(userController.getUserById)
  .put(validator.body(userValidateModel), userController.updateUserById)
  .delete(userController.removeUserById)
  .all(() => { throw createError(501, 'Not Implemented') });

export default userRouter;
