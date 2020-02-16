import { Request, Response, NextFunction } from 'express';

import { GroupService } from '../services';
import { GroupDTO } from 'src/interfaces';

export class GroupController {
  private groupService: GroupService = new GroupService();

  public getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups: GroupDTO[] = await this.groupService.getAllGroups(req.query);
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group: GroupDTO = await this.groupService.getGroupById(req.params.id);
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  };

  public addGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: GroupDTO = await this.groupService.addGroup(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  public updateGroupById = async (req: Request, res: Response, next: NextFunction) => {  
    try {
      const user: GroupDTO = await this.groupService.updateGroupById(req.params.id, req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  public removeGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: GroupDTO[] = await this.groupService.removeGroupById(req.params.id);
      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }
}