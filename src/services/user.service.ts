import createError from 'http-errors';

import { userRepository } from '../repositories';
import { UserDTO, WebUserDTO, AddedUserDTO, IQueryParams } from '../interfaces';

export class UserService {
  public getUserById = async (id: number): Promise<WebUserDTO> => {
    const user = await userRepository.getById({ where: { id } });

    if (!user) {
      throw createError(404, `User with id '${id}' not found!`);
    }

    return user;
  }

  public getAllUsers = async (query?: IQueryParams): Promise<WebUserDTO[]> => await userRepository.getAll(query);

  public addUser = async (body: AddedUserDTO): Promise<WebUserDTO> => {
    const [ user, isJustCreated ] = await userRepository.findOrCreate(body)

    if (!isJustCreated) {
      throw createError(500, `User with login '${body.login}' already exists!`);
    }

    return user;
  }

  public removeUserById = async (id: number): Promise<WebUserDTO[]> => {
    const params = {
      where: { id }
    }

    const isRemoved = await userRepository.remove(params);

    if (!isRemoved) {
      throw createError(404, `User with id '${id}' not found!`);
    }

    return isRemoved
  }

  public updateUserById = async (id: number, body: UserDTO): Promise<WebUserDTO> => {
    const [ isUpdated ] = await userRepository.update(body, { where: { id } });

    if (!isUpdated) {
      throw createError(404, `User with id '${id}' not found!`);
    }
    
    return await this.getUserById(id);
  }
}
