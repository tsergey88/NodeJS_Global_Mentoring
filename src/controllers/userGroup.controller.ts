import { Request, Response, NextFunction } from 'express';

import { UserGroupService } from '../services';
import { winstonLogger } from '../middlewares/winstonLogger.middleware';

export class UserGroupController {
  private userGroupService: UserGroupService = new UserGroupService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.userGroupService.getAll();
      res.status(201).json(response);
    } catch (error) {
      const logInfo = {
        method: 'UserGroupController.getAll',
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };
  
  public addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId, userIds } = req.body;

    try {
      const response = await this.userGroupService.addUsersToGroup(groupId, userIds);
      res.status(201).json(response);
    } catch (error) {
      const logInfo = {
        method: 'UserGroupController.addUsersToGroup',
        params: req.params,
        body: req.body,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };
}