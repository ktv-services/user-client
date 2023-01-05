import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import {
  changePasswordUser,
  changePasswordUserSuccess,
  createUser,
  createUserSuccess,
  editUser,
  editUserSuccess,
  getUsers,
  getUsersSuccess, removeUser, removeUserSuccess, unbindSocialUser, unbindSocialUserSuccess,
  UsersEffects
} from '../../../users';
import { UserService } from '../../../../services/cabinet/users/user.servise';
import { User } from '../../../../models/cabinet/users/user';
import { getUserFirst, getUserNewCreate, getUserSecond } from '../../../../testing/data/users.data';
import { UserCreateDto } from '../../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserChangePasswordDto } from '../../../../models/cabinet/users/dtos/user/user-change-password-dto';
import { Role } from "../../../../models/cabinet/users/role";
import { getRoleFirst, getRoleSecond } from "../../../../testing/data/roles.data";
import { getPermissionFirst } from "../../../../testing/data/permissions.data";

describe('UsersEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;
  const permission = getPermissionFirst();
  const role1: Role = getRoleFirst(permission);
  const role2: Role = getRoleSecond();
  const user1: User = getUserFirst(role1);
  const user2: User = getUserSecond(role2);
  const userNew: UserCreateDto = getUserNewCreate(role1);
  const users = [user1, user2];
  const userId = '22222';
  const socialId = '33333';
  let mockUserService = jasmine.createSpyObj('Service', {
    'getUsers': of({users: users}),
    'createUser': of({status: StoreApiStatus.OK, user: userNew}),
    'editUser': of({status: StoreApiStatus.OK, user: user2, id: userId}),
    'changePasswordUser': of({status: StoreApiStatus.OK, user: user2, id: userId}),
    'unbindSocial': of({status: StoreApiStatus.OK, apiMessage: StoreApiStatus.SUCCESS}),
    'removeUser': of({status: StoreApiStatus.OK, id: userId}),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffects,
        { provide: UserService, useValue: mockUserService },
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(UsersEffects);
  });

  it('getUsers$ should return users', () => {
    const expectedAction = getUsersSuccess({ users });
    actions$ = of(getUsers());
    effects.getUsers$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('createUser$ should create user', () => {
    const expectedAction = createUserSuccess({user: userNew, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(createUser({user: userNew, apiMessage: StoreApiStatus.OK}));
    effects.createUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('editUser$ should edit user', () => {
    const expectedAction = editUserSuccess({userId: userId, user: user2, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(editUser({userId: userId, user: user2, apiMessage: StoreApiStatus.OK}));
    effects.editUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('changePasswordUser$ should change password user', () => {
    const userPasswordDto: UserChangePasswordDto = {password: '123'};
    const expectedAction = changePasswordUserSuccess({userId: userId, user: user2, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(changePasswordUser({userId: userId, password: userPasswordDto, apiMessage: StoreApiStatus.OK}));
    effects.changePasswordUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('unbindSocialUser$ should unbind social user', () => {
    const expectedAction = unbindSocialUserSuccess({apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(unbindSocialUser({userId: userId, socialId: socialId, apiMessage: StoreApiStatus.OK}));
    effects.unbindSocialUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('removeUser$ should remove user', () => {
    const expectedAction = removeUserSuccess({userId: userId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
    actions$ = of(removeUser({userId: userId, apiMessage: StoreApiStatus.OK}));
    effects.removeUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

});
