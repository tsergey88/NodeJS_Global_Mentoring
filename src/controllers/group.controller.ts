import { Request, Response } from 'express';

import { GroupService } from '../services';
import { GroupDTO } from 'src/interfaces';

export class GroupController {
  private groupService: GroupService = new GroupService();

  public getAllGroups = async (req: Request, res: Response) => {
    try {
      const groups: GroupDTO[] = await this.groupService.getAllGroups(req.query);
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  };

  public getGroupById = async (req: Request, res: Response) => {
    try {
      const group: GroupDTO = await this.groupService.getGroupById(req.params.id);
      res.status(200).json(group);
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  };

  public addGroup = async (req: Request, res: Response) => {
    try {
      const user: GroupDTO = await this.groupService.addGroup(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  };

  public updateGroupById = async (req: Request, res: Response) => {  
    try {
      const user: GroupDTO = await this.groupService.updateGroupById(req.params.id, req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  }

  public removeGroupById = async (req: Request, res: Response) => {
    try {
      const users: GroupDTO[] = await this.groupService.removeGroupById(req.params.id);
      res.status(201).json(users);
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  }
}