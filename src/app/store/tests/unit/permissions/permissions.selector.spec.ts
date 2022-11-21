import { initialState, PermissionsState } from '../../../permissions/permissions.state';
import * as PermissionSelector from '../../../permissions/permissions.selector';
import { Permission } from '../../../../models/cabinet/users/permission';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getPermissionFirst, getPermissionSecond } from '../../data/permissions.data';

describe('PermissionSelectors', () => {
  let state: PermissionsState;
  const permission1: Permission = getPermissionFirst();
  const permission2: Permission = getPermissionSecond();
  const permissionId: string = '22222';

  beforeEach(() => {
    state = initialState;
  });

  describe('Permission Selectors', () => {
    it('selectPermissionItems should return permissions', () => {
      state = {
        permissions: [permission1, permission2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const results: Permission[] = PermissionSelector.selectPermissionItems.projector(state);
      expect(results[0].name).toBe('Permission 1');
      expect(results[1].name).toBe('Permission 2');
    });

    it('selectPermissionItem should return permission', () => {
      state = {
        permissions: [permission1, permission2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const results: any = PermissionSelector.selectPermissionItem({id: permissionId}).projector(state);
      expect(results.name).toBe('Permission 2');
    });

    it('selectApiMessageItem should return api message', () => {
      state = {
        permissions: [permission1, permission2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const results: any = PermissionSelector.selectApiMessageItem.projector(state);
      expect(results.apiMessage).toBe('ok');
    });

  });
});
