import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import {
  createPermission,
  createPermissionSuccess, deletePermission, deletePermissionSuccess, editPermission, editPermissionSuccess,
  getPermissions,
  getPermissionsSuccess
} from '../../../permissions/permissions.actions';
import { PermissionsEffects } from '../../../permissions';
import { PermissionService } from '../../../../services/cabinet/permissions/permission.service';
import { Permission } from "../../../../models/cabinet/users/permission";
import { getPermissionFirst, getPermissionSecond } from "../../../../testing/data/permissions.data";
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';

describe('PermissionsEffects', () => {
  let actions$: Observable<any>;
  let effects: PermissionsEffects;
  const permission1: Permission = getPermissionFirst();
  const permission2: Permission = getPermissionSecond();
  const permissions: Permission[] = [permission1, permission2];
  const permissionId: string = '22222';
  let mockPermissionService = jasmine.createSpyObj('Service', {
    'getPermissions': of({permissions: permissions}),
    'createPermission': of({status: StoreApiStatus.OK, permission: permission1}),
    'editPermission': of({status: StoreApiStatus.OK, permission: permission2, id: permissionId}),
    'removePermission': of({status: StoreApiStatus.OK, id: permissionId}),
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

  it('getPermissions$ should return permissions', () => {
    const expectedAction = getPermissionsSuccess({ permissions });
    actions$ = of(getPermissions());
    effects.getPermissions$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('createPermission$ should create permission', () => {
    const expectedAction = createPermissionSuccess({permission: permission1, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(createPermission({permission: permission1, apiMessage: StoreApiStatus.OK}));
    effects.createPermission$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('editPermission$ should edit permission', () => {
    const expectedAction = editPermissionSuccess({permissionId: permissionId, permission: permission2, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(editPermission({permissionId: permissionId, permission: permission2, apiMessage: StoreApiStatus.OK}));
    effects.editPermission$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('removePermission$ should remove permission', () => {
    const expectedAction = deletePermissionSuccess({permissionId: permissionId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(deletePermission({permissionId: permissionId, apiMessage: StoreApiStatus.OK}));
    effects.removePermission$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

});
