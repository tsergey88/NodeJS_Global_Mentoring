export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

export interface WebUser {
  id: string;
  login: string;
  age: number;
  isDeleted: boolean;
};

export interface AddedUser {
  login: string;
  password: string;
  age: number;
}