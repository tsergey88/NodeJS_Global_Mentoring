import { dbParams } from '../interfaces';

export class BaseRepository {
  constructor(entityClass: any) {
    this.entityClass = entityClass
  }

  entityClass: any = null;

  public getAll(params: dbParams) {    
    return this.entityClass.findAll(params);
  }

  public getById(params: dbParams) {
    return this.entityClass.findOne(params)
  }

  public create(entity: Object) {
    return this.entityClass.create(entity);
  }

  public bulkCreate(entities: Array<Object>) {
    return this.entityClass.bulkCreate(entities);
  }

  public remove(params: dbParams) {
    return this.entityClass.destroy(params);
  }

  public update(body: Object, params: dbParams) {
    return this.entityClass.update(body, params);
  }
}