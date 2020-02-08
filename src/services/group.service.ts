import { groupRepository } from '../repositories';
import { GroupDTO, IQueryParams } from 'src/interfaces';

export class GroupService {
  public getAllGroups = async (query?: IQueryParams): Promise<GroupDTO[]> => await groupRepository.getAll(query);

  public getGroupById = async (id: string | number): Promise<GroupDTO> => {
    const group = await groupRepository.getById({ where: { id } });

    if (!group) {
      return Promise.reject(`Group with id '${id}' not found`);
    }

    return group;
  }

  // TODO: replace by findOrCreate method.
  public addGroup = async (group: GroupDTO): Promise<GroupDTO> => {
    const { name, permissions } = group;

    const existedGroup = await groupRepository.getAll({ name });
    
    if (existedGroup.length) {
      return Promise.reject(`Group with name '${name}' already exists`);
    }

    return await groupRepository.create({ name, permissions });
  }

  public removeGroupById = async (id: number | string): Promise<GroupDTO[]> => {
    const params = {
      where: { id }
    }

    return await groupRepository.remove(params);
  }

  public updateGroupById = async (id: number | string, body: GroupDTO): Promise<GroupDTO> => {
    await groupRepository.update(body, { where: { id } });

    return await this.getGroupById(id);
  }
}