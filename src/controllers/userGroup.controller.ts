import { Request, Response } from 'express';

import { UserGroupService } from '../services';

export class UserGroupController {
  private userGroupService: UserGroupService = new UserGroupService();

  public getAll = async (req: Request, res: Response) => {
    try {
      const response = await this.userGroupService.getAll();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  };
  
  public addUsersToGroup = async (req: Request, res: Response) => {
    const { groupId, userIds } = req.body;

    try {
      const response = await this.userGroupService.addUsersToGroup(groupId, userIds);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  };
}