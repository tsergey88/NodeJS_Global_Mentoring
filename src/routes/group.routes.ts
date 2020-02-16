import { Router } from 'express';
import createError from 'http-errors';
import { createValidator } from 'express-joi-validation';

import { GroupController } from '../controllers';
import { groupValidateModel } from '../models';

export const groupRouter = Router();
const groupController: GroupController = new GroupController();
const validator = createValidator({passError: true});

groupRouter.route('/')
  .get(groupController.getAllGroups)
  .post(validator.body(groupValidateModel), groupController.addGroup)
  .all(() => { throw createError(501, 'Not Implemented') });

groupRouter.route('/:id')
  .get(groupController.getGroupById)
  .put(validator.body(groupValidateModel), groupController.updateGroupById)
  .delete(groupController.removeGroupById)
  .all(() => { throw createError(501, 'Not Implemented') });

export default groupRouter;
