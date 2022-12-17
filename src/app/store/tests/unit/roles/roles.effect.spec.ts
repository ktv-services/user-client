import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { PermissionsEffects } from '../../../permissions';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import {
  createRole,
  createRoleSuccess,
  editRole,
  editRoleSuccess, getRoles,
  getRolesSuccess, removeRole,
  removeRoleSuccess,
  RolesEffects
} from '../../../roles';
import { Role } from '../../../../models/cabinet/users/role';
import { getRoleFirst, getRoleSecond } from '../../../../testing/data/roles.data';
import { RolesService } from '../../../../services/cabinet/roles/roles.service';

describe('PermissionsEffects', () => {
  let actions$: Observable<any>;
  let effects: RolesEffects;
  const role1: Role = getRoleFirst();
  const role2: Role = getRoleSecond();
  const roles = [role1, role2];
  const roleId = '22222';
  let mockRoleService = jasmine.createSpyObj('Service', {
    'getRoles': of({roles: roles}),
    'createRole': of({status: StoreApiStatus.OK, role: role1}),
    'editRole': of({status: StoreApiStatus.OK, role: role2, id: roleId}),
    'removeRole': of({status: StoreApiStatus.OK, id: roleId}),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RolesEffects,
        { provide: RolesService, useValue: mockRoleService },
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(RolesEffects);
  });

  it('getRoles$ should return roles', () => {
    const expectedAction = getRolesSuccess({ roles });
    actions$ = of(getRoles());
    effects.getRoles$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('createRole$ should create role', () => {
    const expectedAction = createRoleSuccess({role: role1, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(createRole({role: role1, apiMessage: StoreApiStatus.OK}));
    effects.createRole$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('editRole$ should edit role', () => {
    const expectedAction = editRoleSuccess({roleId: roleId, role: role2, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(editRole({roleId: roleId, role: role2, apiMessage: StoreApiStatus.OK}));
    effects.editRole$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('removeRole$ should remove role', () => {
    const expectedAction = removeRoleSuccess({roleId: roleId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(removeRole({roleId: roleId, apiMessage: StoreApiStatus.OK}));
    effects.removeRole$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

});
