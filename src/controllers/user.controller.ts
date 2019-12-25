import { Request, Response } from 'express';
import createError from 'http-errors';

import { WebUserDTO } from '../dto/user.dto';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService = new UserService();

  public getUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const user: WebUserDTO = this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      throw createError(404, error);
    }
  };

  public getAllUsers = (req: Request, res: Response) => {
    const { query } = req;
    try {
      const users: WebUserDTO[] = this.userService.getAllUsers(query);
      res.status(200).json(users);
    } catch (error) {
      throw createError(500, error);
    }
  };

  public addUser = (req: Request, res: Response) => {
    const { body } = req;

    try {
      const user: WebUserDTO = this.userService.addUser(body);
      res.status(201).json(user);
    } catch (error) {
      throw createError(500, error);
    }
  };

  public removeUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const users: WebUserDTO[] = this.userService.removeUserById(id);
      res.status(201).json(users);
    } catch (error) {
      throw createError(404, error);
    }
  };

  public updateUserById = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const user: WebUserDTO = this.userService.updateUserById(id, body);
      res.status(201).json(user);
    } catch (error) {
      throw createError(404, error);
    }
  }
}