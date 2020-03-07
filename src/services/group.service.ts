import createError from 'http-errors';

import { groupRepository } from '../repositories';
import { GroupDTO, IQueryParams } from 'src/interfaces';

export class GroupService {
  public getAllGroups = async (query?: IQueryParams): Promise<GroupDTO[]> => await groupRepository.getAll(query);

  public getGroupById = async (id: string | number): Promise<GroupDTO> => {
    const group = await groupRepository.getByParams({ where: { id } });

    if (!group) {
      throw createError(404, `Group with id '${id}' not found!`);
    }

    return group;
  }
  
  public addGroup = async (body: GroupDTO): Promise<GroupDTO> => {
    const [ group, isJustCreated ] = await groupRepository.findOrCreate(body);

    if (!isJustCreated) {
      throw createError(500, `Group with login '${body.name}' already exists!`);
    }

    return group;
  }

  public removeGroupById = async (id: number | string): Promise<GroupDTO[]> => {
    const params = {
      where: { id }
    }

    const isRemoved = await groupRepository.remove(params);

    if (!isRemoved) {
      throw createError(404, `Group with id '${id}' not found!`);
    }

    return isRemoved;
  }

  public updateGroupById = async (id: number | string, body: GroupDTO): Promise<GroupDTO> => {
    const [ isUpdated ] = await groupRepository.update(body, { where: { id } });

    if (!isUpdated) {
      throw createError(404, `Group with id '${id}' not found!`);
    }

    return await this.getGroupById(id);
  }
}