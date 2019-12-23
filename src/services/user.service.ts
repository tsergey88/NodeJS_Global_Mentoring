import uuid from 'uuid/v4';

import { User, WebUser, AddedUser } from '../interfaces/user.interfaces';

const UserCollection: User[] = [
  {
    id: uuid(),
    login: 'Joe',
    password: 'qwerty1234',
    age: 20,
    isDeleted: false
  }
];

export class UserService {
  public getUserById(id: string): WebUser {
    const user = UserCollection.find(item => item.id === id);
    const { login, age, isDeleted } = user;

    return { id, login, age, isDeleted };
  }

  public getAllUsers(): WebUser[] {
    return UserCollection;
  }

  public addUser(user: AddedUser): WebUser {
    const { login, password, age } = user;
    const id = uuid();
    const isDeleted = false;
    const newUser = { id, login, password, age, isDeleted };

    UserCollection.push(newUser);

    return { id, login, age, isDeleted }
  }

  public removeUserById(id: string): void {
    const index = UserCollection.findIndex(item => item.id === id);
    UserCollection.splice(index, 1);
  }
}
