import uuid from 'uuid/v4';

import { UserDTO, WebUserDTO, AddedUserDTO } from '../dto/user.dto';
import { sortDESC, getWebUserDTO } from '../utils';

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

interface QueryParams {
  login: string,
  limit: number
}

export default class UserService {
  public getUserById = (id: string): Promise<WebUserDTO> => {
    const user = UsersCollection.find(item => item.id === id);

    if (user) {
      const response = getWebUserDTO(user);
      return Promise.resolve(response);
    }

    return Promise.reject(`User with id: ${id} not found`);
  }

  public getAllUsers = (query?: QueryParams): Promise<WebUserDTO[]> => {
    let response = UsersCollection.slice();

    if (query.login) {
      response = response
        .filter(user => user.login.toLocaleLowerCase().includes(query.login.toLocaleLowerCase()))
        .sort((a, b) => sortDESC(a.login, b.login))
    }

    if (query.limit) {
      response = response.slice(0, query.limit);
    }

    return Promise.resolve(response.map(getWebUserDTO));
  };

  public addUser = (user: AddedUserDTO): Promise<WebUserDTO> => {
    const { login, password, age } = user;

    const existedUser = UsersCollection.find(item => item.login === login);

    if (!existedUser) {
      const id = uuid();
      const isDeleted = false;
      const newUser = { id, login, password, age, isDeleted };

      UsersCollection.push(newUser);
      const response = getWebUserDTO(newUser);

      return Promise.resolve(response);
    }

    return Promise.reject(`User with login: ${login} already exists`);
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
