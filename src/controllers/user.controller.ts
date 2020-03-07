import { Request, Response, NextFunction } from 'express';

import { WebUserDTO } from '../interfaces';
import { UserService } from '../services';
import { winstonLogger } from '../middlewares/winstonLogger.middleware';

export class UserController {
  private userService: UserService = new UserService();

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    try {
      const user: WebUserDTO = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      const logInfo = {
        method: 'UserController.getUserById',
        params: req.params,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body; 

    try {
      const response = await this.userService.getJWT(login, password);
      res.status(201).json(response);
    } catch (error) {
      const logInfo = {
        method: 'UserController.loginUser',
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req;
    
    try {
      const users: WebUserDTO[] = await this.userService.getAllUsers(query);
      res.status(200).json(users);
    } catch (error) {
      const logInfo = {
        method: 'UserController.getAllUsers',
        query,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const user: WebUserDTO = await this.userService.addUser(body);
      res.status(201).json(user);
    } catch (error) {
      const logInfo = {
        method: 'UserController.addUser',
        body,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public removeUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    try {
      const users: WebUserDTO[] = await this.userService.removeUserById(id);
      res.status(201).json(users);
    } catch (error) {
      const logInfo = {
        method: 'UserController.removeUserById',
        params: req.params,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  };

  public updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const id = parseInt(req.params.id, 10);

    try {
      const user: WebUserDTO = await this.userService.updateUserById(id, body);
      res.status(201).json(user);
    } catch (error) {
      const logInfo = {
        method: 'UserController.updateUserById',
        params: req.params,
        body,
        message: error.message
      };
      winstonLogger.error(JSON.stringify(logInfo));
      next(error);
    }
  }
}