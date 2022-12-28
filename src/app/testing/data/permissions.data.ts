import { Permission } from '../../models/cabinet/users/permission';
import { StatusEnum } from '../../models/common/status/enums/statuses.enum';
import { PermissionDetailDto } from '../../models/cabinet/users/dtos/permission/permission-detail-dto';

export function getPermissionFirst(): Permission {
  return {_id: '1111', name: 'Permission 1', status: StatusEnum.ACTIVE};
}

export function getPermissionSecond(): Permission {
  return {_id: '22222', name: 'Permission 2', status: StatusEnum.NEW};
}

export function getPermissionNew(): PermissionDetailDto {
  return {_id: '22222', name: 'Permission new', status: StatusEnum.ACTIVE};
}
