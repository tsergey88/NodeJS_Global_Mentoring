import { Router } from 'express';
import createError from 'http-errors';

import { UserGroupController } from '../controllers';

export const userGroupRouter = Router();
const userGroupController: UserGroupController = new UserGroupController();

userGroupRouter.route('/')
  .get(userGroupController.getAll)
  .post(userGroupController.addUsersToGroup)
  .all(() => { throw createError(501, 'Not Implemented') });

export default userGroupRouter;
