import { WebUserDTO, UserDTO } from '../dto/user.dto';

export const sortASC = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

export const getWebUserDTO = (user: UserDTO): WebUserDTO => (
  {
    id: user.id,
    login: user.login,
    age: user.age,
    isDeleted: user.isDeleted
  }
);