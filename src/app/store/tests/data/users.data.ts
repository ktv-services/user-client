import { Permission } from '../../../models/cabinet/users/permission';
import { StatusEnum } from '../../../models/common/status/enums/statuses.enum';
import { Role } from '../../../models/cabinet/users/role';
import { User } from '../../../models/cabinet/users/user';
import { UserDetailDto } from '../../../models/cabinet/users/dtos/user/user-detail-dto';

const permission: Permission = {name: 'Permission 1', status: StatusEnum.ACTIVE};
const role: Role = {name: 'Role 1', status: StatusEnum.ACTIVE, permissions: [permission]};

export function getUserFirst(): User {
  return {_id: '11111', email: 'user1@gmail.com', status: StatusEnum.ACTIVE, role: role};
}

export function getUserSecond(): User {
  return {_id: '22222', email: 'user2@gmail.com', status: StatusEnum.ACTIVE, role: role};
}

export function getUserNew(): UserDetailDto {
  return {_id: '22222', email: 'newuser@gmail.com', status: StatusEnum.ACTIVE, role: role, socials: [], permission: []};
}
