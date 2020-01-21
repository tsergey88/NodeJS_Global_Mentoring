// import uuid from 'uuid/v4';
import { Op } from 'sequelize';

import { User } from '../models/user.model';
import { UserDTO, WebUserDTO, AddedUserDTO, IQueryParams } from '../interfaces';
import { getWebUserDTO } from '../utils';

const UsersCollection: UserDTO[] = [
  {
    id: '9d199097-5b8e-4cb7-9dba-1373e6a37487',
    login: 'Joe',
    password: 'qwerty1234',
    age: 20,
    isDeleted: false
  },
  {
    id: '9d199097-5b8e-4cb7-9dba-1373e6a37480',
    login: 'Bond',
    password: 'qwerty1234',
    age: 20,
    isDeleted: false
  }
];

export default class UserService {
  public getUserById = (id: string): Promise<WebUserDTO> => {
    const user = UsersCollection.find(item => item.id === id);

    if (user) {
      const response = getWebUserDTO(user);
      return Promise.resolve(response);
    }

    return Promise.reject(`User with id: ${id} not found`);
  }

  public getAllUsers = async (query?: IQueryParams): Promise<WebUserDTO[]> => {
      const limit = query.limit || 100;
      const where = {};
      const order = [];

      if (query.login) {
        where.login = {
          [Op.substring]: query.login
        };
        order.push(['login', 'DESC']);
      }      

      let data = await User.findAll({
        attributes: ['id', 'login', 'age'],
        where,
        order,
        limit
      });
  
      return data
  };

  public addUser = async (user: AddedUserDTO): Promise<WebUserDTO> => {
    const { login, password, age } = user;
    const existedUser = await User.findAll({
      where: {
        login: {
          [Op.substring]: login
        }
      }
    });

    if (existedUser.length) { return Promise.reject(`User with login: '${login}' already exists`); }
    
    const newUser = await User.create({ login, password, age });

    return newUser;
  }

  public removeUserById = (id: string): Promise<WebUserDTO[]> => {
    const user = UsersCollection.find(item => item.id === id);

    if (user) {
      user.isDeleted = true;
      const response = UsersCollection.map(getWebUserDTO);

      return Promise.resolve(response);
    }

    return Promise.reject(`User with id: ${id} not found`);
  }

  public updateUserById = (id: string, body: UserDTO): Promise<WebUserDTO> => {
    let user = UsersCollection.find(item => item.id === id);

    if (user) {
      user = { ...user, ...body };
      const response = getWebUserDTO(user);

      return Promise.resolve(response);
    }

    return Promise.reject(`User with id: ${id} not found`);
  }
}
