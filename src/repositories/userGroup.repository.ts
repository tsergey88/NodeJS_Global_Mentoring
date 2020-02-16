import { BaseRepository } from './base.repository';
import { UserGroup } from '../models';

class UserGroupRepository extends BaseRepository {
  constructor() {
    super(UserGroup)
  }
}

export const userGroupRepository = new UserGroupRepository();