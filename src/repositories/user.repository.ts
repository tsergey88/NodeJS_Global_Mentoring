import { Op } from 'sequelize';

import { BaseRepository } from './base.repository';
import { User } from '../models';
import { dbParams } from '../interfaces';
import { IQueryParams } from '../interfaces';

const LIMIT = 100;

class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }

  public getAll(query?: IQueryParams) {
    const params: dbParams = {
      attributes: { exclude: ['password'] },
      limit: LIMIT
    };

    if (query.login) {
      params.where = { login: { [Op.substring]: query.login } };
      params.order = [['login', 'DESC']];
    }

    if (query.limit) {
      params.limit = query.limit
    }
    
    return this.entityClass.findAll(params);
  }

  public getById(params: dbParams) {
    params.attributes = { exclude: ['password'] };

    return this.entityClass.findOne(params)
  }

  public update(body: Object, params: dbParams) {
    params.attributes = { exclude: ['password'] };
    
    return this.entityClass.update(body, params);
  }
}

export const userRepository = new UserRepository();