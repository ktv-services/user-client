import { Permission } from './permission';
import { Role } from './role';
import { SocialUser } from '../../login/social-user';
import { Base } from './base.model';

export interface User extends Base {
  email: string;
  _id?: string;
  role: Role;
  socials?: SocialUser[];
  permission?: Permission[];
  status: string;
  token?: string;
  username?: string;
  password?: string;
}
