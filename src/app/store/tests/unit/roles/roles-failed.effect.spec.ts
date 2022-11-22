import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import {
  createRole, createRoleFailed,
  editRole, editRoleFailed,
  removeRole, removeRoleFailed,
  RolesEffects
} from '../../../roles';
import { Role } from '../../../../models/cabinet/users/role';
import { getRoleFirst, getRoleSecond } from '../../data/roles.data';
import { RolesService } from '../../../../services/cabinet/roles/roles.service';

describe('RoleFailedEffects', () => {
  let actions$: Observable<any>;
  let effects: RolesEffects;
  const role1: Role = getRoleFirst();
  const role2: Role = getRoleSecond();
  const roles = [role1, role2];
  const roleId = '22222';
  let mockRoleService = jasmine.createSpyObj('Service', {
    'getRoles': of(roles),
    'createRole': of({status: StoreApiStatus.ERROR_MESSAGE, role: role1}),
    'editRole': of({status: StoreApiStatus.ERROR_MESSAGE, role: role2, id: roleId}),
    'removeRole': of({status: StoreApiStatus.ERROR_MESSAGE, id: roleId}),
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

  it('createRole$ should get failed', () => {
    const expectedAction = createRoleFailed({apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(createRole({role: role1, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.createRole$.subscribe(action => {
      expect(action.apiMessage).toEqual(expectedAction.apiMessage);
      expect(action.typeMessage).toEqual(expectedAction.typeMessage);
    });
  });

  it('editRole$ should get failed', () => {
    const expectedAction = editRoleFailed({apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(editRole({roleId: roleId, role: role2, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.editRole$.subscribe(action => {
      expect(action.apiMessage).toEqual(expectedAction.apiMessage);
      expect(action.typeMessage).toEqual(expectedAction.typeMessage);
    });
  });

  it('removeRole$ should get failed', () => {
    const expectedAction = removeRoleFailed({roleId, error: StoreApiStatus.ERROR_MESSAGE});
    actions$ = of(removeRole({roleId: roleId, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.removeRole$.subscribe(action => {
      expect(action.roleId).toEqual(expectedAction.roleId);
    });
  });

});
