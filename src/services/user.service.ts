import { userRepository } from '../repositories';
import { UserDTO, WebUserDTO, AddedUserDTO, IQueryParams } from '../interfaces';

export class UserService {
  public getUserById = async (id: number): Promise<WebUserDTO> => {
    const user = await userRepository.getById({ where: { id } });

    if (!user) {
      return Promise.reject(`User with id '${id}' not found`);
    }

    return user;
  }

  public getAllUsers = async (query?: IQueryParams): Promise<WebUserDTO[]> => await userRepository.getAll(query);

  // TODO: replace by findOrCreate method.
  public addUser = async (user: AddedUserDTO): Promise<WebUserDTO> => {
    const { login, password, age } = user;

    const existedUser = await userRepository.getAll({ login });

    if (existedUser.length) {
      return Promise.reject(`User with login '${login}' already exists`);
    }

    return await userRepository.create({ login, password, age });
  }

  public removeUserById = async (id: number): Promise<WebUserDTO[]> => {
    const params = {
      where: { id }
    }

    return await userRepository.remove(params);
  }

  public updateUserById = async (id: number, body: UserDTO): Promise<WebUserDTO> => {
    await userRepository.update(body, { where: { id } });

    return await this.getUserById(id);
  }
}
