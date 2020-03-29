import { Op } from 'sequelize';

import { BaseRepository } from './base.repository';
import { User } from '../models';
import { dbParams, AddedUserDTO, IQueryParams } from '../interfaces';

const LIMIT = 100;

export class UserRepository extends BaseRepository {
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

  public getByParams(params: dbParams) {
    params.attributes = { exclude: ['password'] };

    return this.entityClass.findOne(params)
  }

  public update(body: Object, params: dbParams) {
    params.attributes = { exclude: ['password'] };
    
    return this.entityClass.update(body, params);
  }

  public findOrCreate(body: AddedUserDTO) {
    const entity = {
      where: { login: body.login },
      defaults: { ...body }
    }
    return this.entityClass.findOrCreate(entity);
  }
}

export const userRepository = new UserRepository();