export interface UserDTO {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export interface WebUserDTO {
  id: string;
  login: string;
  age: number;
  isDeleted: boolean;
};

export interface AddedUserDTO {
  login: string;
  password: string;
  age: number;
}