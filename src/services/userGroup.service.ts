import { userGroupRepository } from '../repositories';

export class UserGroupService {
  public getAll = () => userGroupRepository.getAll();

  public addUsersToGroup = (groupId: number, userIds: Array<number>) => {
    const data = userIds.map(userId => ({ userId, groupId }));
    
    return userGroupRepository.bulkCreate(data);
  }
}