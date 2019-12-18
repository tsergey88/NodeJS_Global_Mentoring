import * as uuid from 'uuid/v4';

import User from '../models/user.model';

const uniqueId: string = uuid();

const UserCollection: User[] = [
    {
        id: uniqueId,
        login: 'Joe',
        password: 'qwerty1234',
        age: 20,
        isDeleted: false
    }
];

export class UserService {
    public getUserById(id: string): User {
        return UserCollection.find(item => item.id === id);
    }

    public getAllUsers(): User[] {
        return UserCollection;
    }

    public addUser(user: User): void {
        UserCollection.push(user);
    }

    public removeUserById(id: string): void {
        const index = UserCollection.findIndex(item => item.id === id);
        UserCollection.splice(index, 1);
    }
}
