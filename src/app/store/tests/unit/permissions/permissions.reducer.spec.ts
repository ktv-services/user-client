import { reducer } from '../../../permissions/permissions.reducer';
import {
  createPermissionSuccess,
  deletePermissionSuccess, editPermissionSuccess,
  getPermissions,
  getPermissionsSuccess
} from '../../../permissions/permissions.actions';
import { initialState, PermissionsState } from '../../../permissions/permissions.state';
import { StatusEnum } from '../../../../models/common/status/enums/statuses.enum';
import { Permission } from '../../../../models/cabinet/users/permission';
import { PermissionCreateDto } from '../../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { PermissionDetailDto } from '../../../../models/cabinet/users/dtos/permission/permission-detail-dto';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getPermissionFirst, getPermissionNew, getPermissionSecond } from '../../data/permissions.data';

describe('PermissionReducer', () => {
  let state: PermissionsState;
  const permission1: Permission = getPermissionFirst();
  const permission2: Permission = getPermissionSecond();
  const permissionId = '22222';

  beforeEach(() => {
    state = initialState;
  });

  describe('Valid Permission actions', () => {
    it('getPermissions should return permissions', () => {
      state = {
        permissions: [],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = getPermissions();
      const result = reducer(state, action);

      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('getPermissionsSuccess should return permissions', () => {
      const permissions = [permission1, permission2];
      state = {
        permissions: permissions,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = getPermissionsSuccess({permissions: permissions});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(2);
      expect(result.permissions[0].name).toBe('Permission 1');
      expect(result.permissions[1].status).toBe(StatusEnum.NEW);
      expect(result.apiMessage).toBe(StoreApiStatus.OK,);
      expect(result.typeMessage).toBe('success');
    });

    it('createPermissionSuccess should create permission', () => {
      const permission: PermissionCreateDto = {name: 'Permission new', status: StatusEnum.ACTIVE};
      const permissions = [permission1, permission];
      state = {
        permissions: permissions,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = createPermissionSuccess({permission: permission, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(3);
      expect(result.permissions[1].name).toBe('Permission new');
      expect(result.permissions[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK,);
      expect(result.typeMessage).toBe('success');
    });

    it('editPermissionSuccess should edit permission', () => {
      const permission: PermissionDetailDto = getPermissionNew();
      const permissions = [permission1, permission2];
      state = {
        permissions: permissions,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = editPermissionSuccess({permissionId: permissionId, permission: permission, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(2);
      expect(result.permissions[1].name).toBe('Permission new');
      expect(result.permissions[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('deletePermission should delete permission', () => {
      const permissions = [permission1, permission2];
      state = {
        permissions: permissions,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = deletePermissionSuccess({permissionId: permissionId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.permissions.length).toBe(1);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });
  });
});
