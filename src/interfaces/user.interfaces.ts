export interface UserDTO {
  id: string;
  login: string;
  password: string;
  age: number;
};

export interface WebUserDTO {
  id?: string;
  login: string;
  age: number;
};

export interface AddedUserDTO {
  login: string;
  password: string;
  age: number;
}