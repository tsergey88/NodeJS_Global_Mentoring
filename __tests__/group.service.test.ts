import { GroupService } from '../src/services';
import { GroupRepositoryMock } from '../__mocks__/repository.mock';
import { Groups, Group, existingGroup } from '../__mocks__/groups.mock';

describe('User Service', (): void => {
  let repository: any;
  let groupService: GroupService;

  beforeEach((): void => {
    repository = new GroupRepositoryMock;
    groupService = new GroupService(repository)
  });

  it('get all groups array', async (): Promise<void>  => {
    const groups = await groupService.getAllGroups();
    
    expect(Array.isArray(groups)).toBe(true);
  });

  it('get group by id', async (): Promise<void>  => {
    const group = await groupService.getGroupById(2);

    expect(group).toEqual(Groups[1]);
  });

  it('get group by wrong id', async (): Promise<void>  => {
    try {
      await groupService.getGroupById(6);
    } catch(e) {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("Group with id '6' not found!");
    }
  });

  it('add group', async (): Promise<void> => {
    const group = await groupService.addGroup(Group);
    
    expect(group).toEqual(Group);
  });

  it('try to add existing group', async (): Promise<void> => {
    try {
      await groupService.addGroup(existingGroup);
    } catch(e) {
      expect(e.status).toEqual(500);
      expect(e.message).toEqual("Group with name 'SuperAdmin' already exists!");
    }    
  });

  it('remove group', async (): Promise<void> => {
    const isRemoved = await groupService.removeGroupById(1);
    
    expect(isRemoved).toEqual(true);
  });

  it('try to remove not existing group', async (): Promise<void> => {
    try {
      await groupService.removeGroupById(6);
    } catch(e) {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("Group with id '6' not found!");
    }    
  });

  it('update group', async (): Promise<void> => {
    const group = await groupService.updateGroupById(1, Group);

    expect(repository.update).toHaveBeenCalled;
    expect(group).toEqual(Groups[0]);
  });

  it('try to update not existing group', async (): Promise<void> => {
    try {
      await groupService.updateGroupById(6, Group);
    } catch(e) {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("Group with id '6' not found!");
    }    
  });
  
})