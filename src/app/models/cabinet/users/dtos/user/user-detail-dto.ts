import { Role } from '../../role';

export interface UserDetailDto {
  email: string;
  _id: string;
  role: Role;
  status: string;
}
