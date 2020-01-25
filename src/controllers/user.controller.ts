import { Request, Response } from 'express';

import { WebUserDTO } from '../interfaces';
import { UserService } from '../services';

export class UserController {
  private userService: UserService = new UserService();

  public getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    try {
      const user: WebUserDTO = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  };

  public getAllUsers = async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const users: WebUserDTO[] = await this.userService.getAllUsers(query);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  };

  public addUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      const user: WebUserDTO = await this.userService.addUser(body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  };

  public removeUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    try {
      const users: WebUserDTO[] = await this.userService.removeUserById(id);
      res.status(201).json(users);
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  };

  public updateUserById = async (req: Request, res: Response) => {
    const { body } = req;
    const id = parseInt(req.params.id, 10);

    try {
      const user: WebUserDTO = await this.userService.updateUserById(id, body);
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({ status: 404, error });
    }
  }
}