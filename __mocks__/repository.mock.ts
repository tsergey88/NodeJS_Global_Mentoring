import { Users } from './users.mock';
import { Groups } from './groups.mock';
import { WebUserDTO, AddedUserDTO, dbParams, GroupDTO } from '../src/interfaces';

export const UserRepositoryMock = jest.fn(() => ({
  getAll: jest.fn(async (): Promise<WebUserDTO[]> => Users),
  getByParams: jest.fn(async (params: dbParams): Promise<WebUserDTO> => {
    return Users.find(user => user.id === params.where.id);
  }),
  create: jest.fn(async (user: AddedUserDTO): Promise<AddedUserDTO> => user ),
  remove: jest.fn(async (params: dbParams): Promise<boolean> => {
    return !!Users.find(user => user.id === params.where.id);
  }),
  update: jest.fn(async (user: AddedUserDTO, params: dbParams): Promise<any> => {
    const selfUser = Users.find(u => u.id === params.where.id);

    if (selfUser) {
      return [ true ]
    }

    return [ false ];
  }),
  findOrCreate: jest.fn(async (user: AddedUserDTO): Promise<any> => {
    const selfUser = Users.find(u => u.login === user.login);

    if (selfUser) {
      return [ selfUser, false]
    }

    return [ user, true ];
  }),
  bulkCreate: jest.fn(),
  entityClass: {}
}));

export const GroupRepositoryMock = jest.fn(() => ({
  getAll: jest.fn(async (): Promise<any> => Groups),
  getByParams: jest.fn(async (params: dbParams): Promise<any> => {
    return Groups.find(group => group.id === params.where.id);
  }),
  create: jest.fn(async (group: GroupDTO): Promise<any> => group ),
  remove: jest.fn(async (params: dbParams): Promise<boolean> => {
    return !!Groups.find(group => group.id === params.where.id);
  }),
  update: jest.fn(async (group: GroupDTO, params: dbParams): Promise<any> => {
    const selfGroup = Users.find(u => u.id === params.where.id);

    if (selfGroup) {
      return [ true ]
    }

    return [ false ];
  }),
  findOrCreate: jest.fn(async (group: GroupDTO): Promise<any> => {
    const selfGroup = Users.find(u => u.login === group.name);

    if (selfGroup) {
      return [ selfGroup, false]
    }

    return [ group, true ];
  }),
  bulkCreate: jest.fn(),
  entityClass: {}
}));