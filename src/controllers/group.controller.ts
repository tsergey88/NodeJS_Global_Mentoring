import { Request, Response, NextFunction } from 'express';

import { GroupService } from '../services';
import { GroupDTO } from '../interfaces';
import { winstonLogger } from '../middlewares/winstonLogger.middleware';

export class GroupController {
  constructor(service: GroupService) {
    this.groupService = service;
  }
  
  private groupService: GroupService = null;

  public getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups: GroupDTO[] = await this.groupService.getAllGroups(req.query);
      res.status(200).json(groups);
    } catch (error) {
      const logInfo = {
        method: 'GroupController.getAllGroups',
        query: req.query,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group: GroupDTO = await this.groupService.getGroupById(req.params.id);
      res.status(200).json(group);
    } catch (error) {
      const logInfo = {
        method: 'GroupController.getGroupById',
        params: req.params,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public addGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: GroupDTO = await this.groupService.addGroup(req.body);
      res.status(201).json(user);
    } catch (error) {
      const logInfo = {
        method: 'GroupController.addGroup',
        body: req.body,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public updateGroupById = async (req: Request, res: Response, next: NextFunction) => {  
    try {
      const user: GroupDTO = await this.groupService.updateGroupById(req.params.id, req.body);
      res.status(201).json(user);
    } catch (error) {
      const logInfo = {
        method: 'GroupController.updateGroupById',
        body: req.body,
        params: req.params,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  }

  public removeGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: GroupDTO[] = await this.groupService.removeGroupById(req.params.id);
      res.status(201).json(users);
    } catch (error) {
      const logInfo = {
        method: 'GroupController.removeGroupById',
        params: req.params,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  }
}