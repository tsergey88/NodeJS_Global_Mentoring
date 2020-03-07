import { Sequelize } from 'sequelize-typescript';

import { dbParams } from '../interfaces';

export class BaseRepository {
  constructor(entityClass: any) {
    this.entityClass = entityClass
  }

  entityClass: any = null;

  public getAll(params?: dbParams) {    
    return this.entityClass.findAll(params);
  }

  public getByParams(params: dbParams) {
    return this.entityClass.findOne(params)
  }

  public create(entity: Object) {
    return this.entityClass.create(entity);
  }

  public bulkCreate(entities: Array<Object>) {
    return this.entityClass.sequelize.transaction( (t: Sequelize) => this.entityClass.bulkCreate(entities, { transaction: t }));
  }

  public remove(params: dbParams) {
    return this.entityClass.destroy(params);
  }

  public update(body: Object, params: dbParams) {
    return this.entityClass.update(body, params);
  }

  public findOrCreate(entity: Object) {
    return this.entityClass.findOrCreate(entity);
  }
}