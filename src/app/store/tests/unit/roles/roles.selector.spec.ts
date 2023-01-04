import * as RolesSelector from '../../../roles/roles.selector';
import { Role } from '../../../../models/cabinet/users/role';
import { initialState, RolesState } from '../../../roles';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getRoleFirst, getRoleSecond } from '../../../../testing/data/roles.data';
import { getPermissionFirst } from '../../../../testing/data/permissions.data';

describe('RoleSelectors', () => {
  let state: RolesState;
  const permission = getPermissionFirst();
  const role1: Role = getRoleFirst(permission);
  const role2: Role = getRoleSecond();
  const roleId = '22222';

  beforeEach(() => {
    state = initialState;
  });

  describe('Role Selectors', () => {
    it('selectRoleItems should return permissions', () => {
      state = {
        roles: [role1, role2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const results: any = RolesSelector.selectRolesItems.projector(state);
      expect(results[0].name).toBe('Role 1');
      expect(results[1].name).toBe('Role 2');
    });

    it('selectRoleItem should return permission', () => {
      state = {
        roles: [role1, role2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const results: any = RolesSelector.selectRoleItem({id: roleId}).projector(state.roles);
      expect(results.name).toBe('Role 2');
    });

    it('selectApiMessageItem should return api message', () => {
      state = {
        roles: [role1, role2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const results: any = RolesSelector.selectApiMessageItem.projector(state);
      expect(results.apiMessage).toBe('ok');
    });

  });
});
