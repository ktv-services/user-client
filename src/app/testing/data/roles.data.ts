import { StatusEnum } from '../../models/common/status/enums/statuses.enum';
import { Role } from '../../models/cabinet/users/role';
import { RoleDetailDto } from '../../models/cabinet/users/dtos/role/role-detail-dto';

export function getRoles(): Role[] {
  return [
    {_id: '11111', name: 'Role 1', status: StatusEnum.ACTIVE},
    {_id: '22222', name: 'Role 2', status: StatusEnum.ACTIVE},
    {_id: '33333', name: 'Role 3', status: StatusEnum.NEW},
    {_id: '44444', name: 'Role 4', status: StatusEnum.NEW},
    {_id: '55555', name: 'Role 5', status: StatusEnum.ACTIVE},
    ];
}


export function getRoleFirst(): Role {
  return {_id: '11111', name: 'Role 1', status: StatusEnum.NEW};
}

export function getRoleSecond(): Role {
  return {_id: '22222', name: 'Role 2', status: StatusEnum.ACTIVE};
}

export function getRoleNew(): RoleDetailDto {
  return {_id: '22222', name: 'Role new', status: StatusEnum.ACTIVE};
}
