import { reducer } from '../roles.reducer';
import { StatusEnum } from '../../../models/common/status/enums/statuses.enum';
import { Permission } from '../../../models/cabinet/users/permission';
import { initialState, RolesState } from '../roles.state';
import { createRoleSuccess, editRoleSuccess, getRoles, getRolesSuccess, removeRoleSuccess } from '../roles.actions';
import { Role } from '../../../models/cabinet/users/role';
import { RoleCreateDto} from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { RoleDetailDto } from '../../../models/cabinet/users/dtos/role/role-detail-dto';

describe('RoleReducer', () => {
  let state: RolesState;
  const permission: Permission = {name: 'Permission 1', status: StatusEnum.ACTIVE};
  const role1: Role = {_id: '11111', name: 'Role 1', status: StatusEnum.NEW, permissions: [permission]};
  const role2: Role = {_id: '22222', name: 'Role 2', status: StatusEnum.ACTIVE};
  const roleId = '22222';
  const apiMessage = 'ok';
  const typeMessage = 'success';

  beforeEach(() => {
    state = initialState;
  });

  describe('Valid Roles actions', () => {
    it('getRoles should return roles', () => {
      state = {
        roles: [],
        apiMessage: 'ok',
        typeMessage: 'success'
      }
      const action = getRoles();
      const result = reducer(state, action);

      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('getRolesSuccess should return permissions', () => {
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: 'ok',
        typeMessage: 'success'
      }
      const action = getRolesSuccess({roles: roles});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(2);
      expect(result.roles[0].name).toBe('Role 1');
      expect(result.roles[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('createRoleSuccess should create role', () => {
      const role: RoleCreateDto = {name: 'Role new', status: StatusEnum.ACTIVE};
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = createRoleSuccess({role: role, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(3);
      expect(result.roles[2].name).toBe('Role new');
      expect(result.roles[2].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('editRoleSuccess should edit role', () => {
      const role: RoleDetailDto = {_id: roleId, name: 'Role new', status: StatusEnum.ACTIVE, permissions: [permission]};
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = editRoleSuccess({roleId: roleId, role: role, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(2);
      expect(result.roles[1].name).toBe('Role new');
      expect(result.roles[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });

    it('deleteRole should delete role', () => {
      const roles = [role1, role2];
      state = {
        roles: roles,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = removeRoleSuccess({roleId: roleId, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.roles.length).toBe(1);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });
  });
});
