import createError from 'http-errors';

import { GroupRepository } from '../repositories';
import { GroupDTO, IQueryParams } from 'src/interfaces';

export class GroupService {
  constructor(repository: GroupRepository) {
    this.groupRepository = repository;
  }

  private groupRepository: GroupRepository = null;

  public getAllGroups = async (query?: IQueryParams): Promise<GroupDTO[]> => await this.groupRepository.getAll(query);

  public getGroupById = async (id: number): Promise<GroupDTO> => {
    const group = await this.groupRepository.getByParams({ where: { id } });

    if (!group) {
      throw createError(404, `Group with id '${id}' not found!`);
    }

    return group;
  }
  
  public addGroup = async (body: GroupDTO): Promise<GroupDTO> => {
    const [ group, isJustCreated ] = await this.groupRepository.findOrCreate(body);

    if (!isJustCreated) {
      throw createError(500, `Group with login '${body.name}' already exists!`);
    }

    return group;
  }

  public removeGroupById = async (id: number): Promise<GroupDTO[]> => {
    const params = {
      where: { id }
    }

    const isRemoved = await this.groupRepository.remove(params);

    if (!isRemoved) {
      throw createError(404, `Group with id '${id}' not found!`);
    }

    return isRemoved;
  }

  public updateGroupById = async (id: number, body: GroupDTO): Promise<GroupDTO> => {
    const [ isUpdated ] = await this.groupRepository.update(body, { where: { id } });

    if (!isUpdated) {
      throw createError(404, `Group with id '${id}' not found!`);
    }

    return await this.getGroupById(id);
  }
}