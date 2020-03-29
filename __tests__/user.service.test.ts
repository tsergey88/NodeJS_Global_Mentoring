import { UserService } from '../src/services';
import { UserRepositoryMock } from '../__mocks__/repository.mock';
import { Users, User, existingUser } from '../__mocks__/users.mock';

describe('User Service', (): void => {
  let repository: any;
  let userService: UserService;

  beforeEach((): void => {
    repository = new UserRepositoryMock;
    userService = new UserService(repository)
  });

  it('get all users array', async (): Promise<void>  => {
    const users = await userService.getAllUsers();
    
    expect(Array.isArray(users)).toBe(true);
  });

  it('get user by id', async (): Promise<void>  => {
    const user = await userService.getUserById(2);

    expect(user).toEqual(Users[1]);
  });

  it('get user by wrong id', async (): Promise<void>  => {
    try {
      await userService.getUserById(6);
    } catch(e) {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("User with id '6' not found!");
    }
  });

  it('add user', async (): Promise<void> => {
    const user = await userService.addUser(User);
    
    expect(user).toEqual(User);
  });

  it('try to add existing user', async (): Promise<void> => {
    try {
      await userService.addUser(existingUser);
    } catch(e) {
      expect(e.status).toEqual(500);
      expect(e.message).toEqual("User with login 'Max' already exists!");
    }    
  });

  it('remove user', async (): Promise<void> => {
    const isRemoved = await userService.removeUserById(1);
    
    expect(isRemoved).toEqual(true);
  });

  it('try to remove not existing user', async (): Promise<void> => {
    try {
      await userService.removeUserById(6);
    } catch(e) {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("User with id '6' not found!");
    }    
  });

  it('update user', async (): Promise<void> => {
    const user = await userService.updateUserById(1, User);

    expect(repository.update).toHaveBeenCalled;
    expect(user).toEqual(Users[0]);
  });

  it('try to update not existing user', async (): Promise<void> => {
    try {
      await userService.updateUserById(6, User);
    } catch(e) {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("User with id '6' not found!");
    }    
  });
  
})