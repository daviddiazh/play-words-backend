import { Role } from '../enums/role';

export interface IUser {
  _id?: string | any;
  name: string;
  email: string;
  password: string;
  role: Role;
}
