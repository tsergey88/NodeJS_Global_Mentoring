import { Request, Response, NextFunction } from 'express';

import { UserGroupService } from '../services';

export class UserGroupController {
  private userGroupService: UserGroupService = new UserGroupService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.userGroupService.getAll();
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
  
  public addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId, userIds } = req.body;

    try {
      const response = await this.userGroupService.addUsersToGroup(groupId, userIds);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}