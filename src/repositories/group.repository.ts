import { Op } from 'sequelize';

import { BaseRepository } from './base.repository';
import { Group } from '../models';
import { dbParams, GroupDTO, IQueryParams } from '../interfaces';

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

  public findOrCreate(body: GroupDTO) {
    const entity = {
      where: { name: body.name },
      defaults: { ...body }
    }
    return this.entityClass.findOrCreate(entity);
  }
};

export const groupRepository = new GroupRepository();