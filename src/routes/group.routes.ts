import { Router } from 'express';
import createError from 'http-errors';
import { createValidator } from 'express-joi-validation';

import { GroupController } from '../controllers';
import { GroupService } from '../services';
import { GroupRepository } from '../repositories';
import { groupValidateModel } from '../models';

export const groupRouter = Router();
const groupRepository: GroupRepository = new GroupRepository();
const groupService: GroupService = new GroupService(groupRepository);
const groupController: GroupController = new GroupController(groupService);
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
