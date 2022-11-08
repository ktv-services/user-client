import { reducer } from '../permissions.reducer';
import {
  createPermissionSuccess,
  deletePermissionSuccess, editPermissionSuccess,
  getPermissions,
  getPermissionsSuccess
} from '../permissions.actions';
import { initialState, PermissionsState } from '../permissions.state';
import { StatusEnum } from '../../../models/common/status/enums/statuses.enum';
import { Permission } from '../../../models/cabinet/users/permission';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { PermissionDetailDto } from '../../../models/cabinet/users/dtos/permission/permission-detail-dto';

describe('PermissionReducer', () => {
  let state: PermissionsState;
  const permission1: Permission = {_id: '11111', name: 'Permission 1', status: StatusEnum.ACTIVE};
  const permission2: Permission = {_id: '22222', name: 'Permission 2', status: StatusEnum.NEW};
  const permissionId = '22222';
  const apiMessage = 'ok';
  const typeMessage = 'success';

  beforeEach(() => {
    state = initialState;
  });

  describe('Valid Permission actions', () => {
    it('getPermissions should return permissions', () => {
      state = {
        permissions: [],
        apiMessage: 'ok',
        typeMessage: 'success'
      }
      const action = getPermissions();
      const result = reducer(state, action);

      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('getPermissionsSuccess should return permissions', () => {
      const permissions = [permission1, permission2];
      state = {
        permissions: permissions,
        apiMessage: 'ok',
        typeMessage: 'success'
      }
      const action = getPermissionsSuccess({permissions: permissions});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(2);
      expect(result.permissions[0].name).toBe('Permission 1');
      expect(result.permissions[1].status).toBe(StatusEnum.NEW);
      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('createPermissionSuccess should create permission', () => {
      const permission: PermissionCreateDto = {name: 'Permission new', status: StatusEnum.ACTIVE};
      const permissions = [permission1, permission];
      state = {
        permissions: permissions,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = createPermissionSuccess({permission: permission, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(3);
      expect(result.permissions[1].name).toBe('Permission new');
      expect(result.permissions[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('editPermissionSuccess should edit permission', () => {
      const permission: PermissionDetailDto = {_id: permissionId, name: 'Permission new', status: StatusEnum.ACTIVE};
      const permissions = [permission1, permission2];
      state = {
        permissions: permissions,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = editPermissionSuccess({permissionId: permissionId, permission: permission, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(2);
      expect(result.permissions[1].name).toBe('Permission new');
      expect(result.permissions[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });

    it('deletePermission should delete permission', () => {
      const permissions = [permission1, permission2];
      state = {
        permissions: permissions,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = deletePermissionSuccess({permissionId: permissionId, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(1);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });
  });
});
