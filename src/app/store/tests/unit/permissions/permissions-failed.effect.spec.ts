import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import {
  createPermission,
  createPermissionFailed,
  deletePermission, deletePermissionFailed,
  editPermission,
  editPermissionFailed,
} from '../../../permissions/permissions.actions';
import { PermissionsEffects } from '../../../permissions';
import { PermissionService } from '../../../../services/cabinet/permissions/permission.service';
import { Permission } from "../../../../models/cabinet/users/permission";
import { getPermissionFirst, getPermissionSecond } from "../../data/permissions.data";
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';

describe('PermissionsFailedEffects', () => {
  let actions$: Observable<any>;
  let effects: PermissionsEffects;
  const permission1: Permission = getPermissionFirst();
  const permission2: Permission = getPermissionSecond();
  const permissionId: string = '22222';
  let mockPermissionService = jasmine.createSpyObj('Service', {
    'createPermission': of({status: StoreApiStatus.ERROR_MESSAGE, permission: null}),
    'editPermission': of({status: StoreApiStatus.ERROR_MESSAGE, permission: null, id: permissionId}),
    'removePermission': of({status: StoreApiStatus.ERROR_MESSAGE, id: permissionId}),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PermissionsEffects,
        { provide: PermissionService, useValue: mockPermissionService },
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(PermissionsEffects);
  });

  it('createPermission$ should get failed', () => {
    const expectedAction = createPermissionFailed({apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(createPermission({permission: permission1, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.createPermission$.subscribe(action => {
      expect(action.apiMessage).toEqual(expectedAction.apiMessage);
      expect(action.typeMessage).toEqual(expectedAction.typeMessage);
    });
  });

  it('editPermission$ should get failed', () => {
    const expectedAction = editPermissionFailed({apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(editPermission({permissionId: permissionId, permission: permission2, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.editPermission$.subscribe(action => {
      expect(action.apiMessage).toEqual(expectedAction.apiMessage);
      expect(action.typeMessage).toEqual(expectedAction.typeMessage);
    });
  });

  it('removePermission$ should get failed', () => {
    const expectedAction = deletePermissionFailed({permissionId, error: StoreApiStatus.ERROR_MESSAGE});
    actions$ = of(deletePermission({permissionId: permissionId, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.removePermission$.subscribe(action => {
      expect(action.permissionId).toEqual(expectedAction.permissionId);
    });
  });

});
