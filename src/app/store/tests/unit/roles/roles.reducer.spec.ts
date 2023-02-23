import { reducer } from '../../../roles/roles.reducer';
import { StatusEnum } from '../../../../models/common/status/enums/statuses.enum';
import { initialState, RolesState } from '../../../roles';
import { createRoleSuccess, editRoleSuccess, getRoles, getRolesSuccess, removeRoleSuccess } from '../../../roles';
import { Role } from '../../../../models/cabinet/users/role';
import { RoleCreateDto} from '../../../../models/cabinet/users/dtos/role/role-create-dto';
import { RoleDetailDto } from '../../../../models/cabinet/users/dtos/role/role-detail-dto';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getRoleFirst, getRoleNew, getRoleSecond } from '../../../../testing/data/roles.data';

describe('RoleReducer', () => {
  let state: RolesState;
  const role1: Role = getRoleFirst();
  const role2: Role = getRoleSecond();
  const roleId = '22222';

  beforeEach(() => {
    state = initialState;
  });

  describe('Valid Roles actions', () => {
    it('getRoles should return roles', () => {
      state = {
        roles: [],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = getRoles();
      const result = reducer(state, action);

      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe('success');
    });

    it('getRolesSuccess should return permissions', () => {
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = getRolesSuccess({roles: roles});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(2);
      expect(result.roles[0].name).toBe('Role 1');
      expect(result.roles[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('createRoleSuccess should create role', () => {
      const role: RoleCreateDto = {name: 'Role new', status: StatusEnum.ACTIVE};
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = createRoleSuccess({role: role, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(3);
      expect(result.roles[2].name).toBe('Role new');
      expect(result.roles[2].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('editRoleSuccess should edit role', () => {
      const role: RoleDetailDto = getRoleNew();
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = editRoleSuccess({roleId: roleId, role: role, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(2);
      expect(result.roles[1].name).toBe('Role new');
      expect(result.roles[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('deleteRole should delete role', () => {
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = removeRoleSuccess({roleId: roleId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(1);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });
  });
});
