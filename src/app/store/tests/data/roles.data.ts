import { Permission } from '../../../models/cabinet/users/permission';
import { StatusEnum } from '../../../models/common/status/enums/statuses.enum';
import { Role } from '../../../models/cabinet/users/role';
import { RoleDetailDto } from '../../../models/cabinet/users/dtos/role/role-detail-dto';

const permission: Permission = {name: 'Permission 1', status: StatusEnum.ACTIVE};

export function getRoleFirst(): Role {
  return {_id: '11111', name: 'Role 1', status: StatusEnum.NEW, permissions: [permission]};
}

export function getRoleSecond(): Role {
  return {_id: '22222', name: 'Role 2', status: StatusEnum.ACTIVE};
}

export function getRoleNew(): RoleDetailDto {
  return {_id: '22222', name: 'Role new', status: StatusEnum.ACTIVE, permissions: [permission]};
}
