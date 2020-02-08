import { Op } from 'sequelize';

import { BaseRepository } from './base.repository';
import { Group } from '../models';
import { dbParams } from '../interfaces';
import { IQueryParams } from '../interfaces';

const LIMIT = 100;

class GroupRepository extends BaseRepository {
  constructor() {
    super(Group)
  }

  public getAll(query?: IQueryParams) {
    const params: dbParams = {
      limit: LIMIT
    };

    if (query.name) {
      params.where = { name: { [Op.substring]: query.name } };
      params.order = [['name', 'DESC']];
    }

    if (query.limit) {
      params.limit = query.limit
    }
    
    return this.entityClass.findAll(params);
  }
};

export const groupRepository = new GroupRepository();