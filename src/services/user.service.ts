import uuid from 'uuid/v4';

import { UserDTO, WebUserDTO, AddedUserDTO } from '../dto/user.dto';
import { sortASC, getWebUserDTO } from '../utils';

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
  public getUserById = (id: string): WebUserDTO => {
    const user = UsersCollection.find(item => item.id === id);

    if (user) {
      return getWebUserDTO(user);
    }

    throw new Error(`User with id: ${id} not found`);
  }

  public getAllUsers = (query?: QueryParams): WebUserDTO[] => {
    if (query.login || query.limit) {
      const { login = "", limit = 1000 } = query;

      //TODO: change for empty login or emty limit
      return UsersCollection
      .filter(user => user.login.toLocaleLowerCase().includes(login.toLocaleLowerCase()))
      .sort((a, b) => sortASC(a.login, b.login))
      .slice(0, limit)
      .map(getWebUserDTO);
    }

    return UsersCollection.map(getWebUserDTO);
  };

  public addUser = (user: AddedUserDTO): WebUserDTO => {
    const { login, password, age } = user;

    const existedUser = UsersCollection.find(item => item.login === login);

    if (!existedUser) {
      const id = uuid();
      const isDeleted = false;
      const newUser = { id, login, password, age, isDeleted };

      UsersCollection.push(newUser);

      return getWebUserDTO(newUser);
    }

    throw new Error(`User with login: ${login} already exists`);
  }

  public removeUserById = (id: string): WebUserDTO[] => {
    const user = UsersCollection.find(item => item.id === id);

    if (user) {
      user.isDeleted = true;

      return UsersCollection.map(getWebUserDTO);
    }

    throw new Error(`User with id: ${id} not found`);
  }

  public updateUserById = (id: string, body: UserDTO): WebUserDTO => {
    let user = UsersCollection.find(item => item.id === id);

    if (user) {
      user = { ...user, ...body };

      return getWebUserDTO(user);
    }

    throw new Error(`User with id: ${id} not found`);
  }
}
