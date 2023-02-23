import { StatusEnum } from '../../models/common/status/enums/statuses.enum';
import { Role } from '../../models/cabinet/users/role';
import { User } from '../../models/cabinet/users/user';
import { UserDetailDto } from '../../models/cabinet/users/dtos/user/user-detail-dto';
import { UserCreateDto } from '../../models/cabinet/users/dtos/user/user-create-dto';


export function getUserFirst(role: Role): User {
  return {_id: '11111', email: 'user1@gmail.com', status: StatusEnum.ACTIVE, role: role};
}

export function getUserSecond(role: Role): User {
  return {_id: '22222', email: 'user2@gmail.com', status: StatusEnum.ACTIVE, role: role};
}

export function getUserNew(role: Role): UserDetailDto {
  return {_id: '22222', email: 'newuser@gmail.com', status: StatusEnum.ACTIVE, role: role};
}

export function getUserNewCreate(role: Role): UserCreateDto {
  return {email: 'newuser@gmail.com', password: '123', status: StatusEnum.ACTIVE, role: role};
}
