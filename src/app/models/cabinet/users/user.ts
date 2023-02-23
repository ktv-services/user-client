import { Role } from './role';
import { Base } from './base.model';

export interface User extends Base {
  email: string;
  _id?: string;
  role: Role;
  status: string;
  username?: string;
  password?: string;
}
