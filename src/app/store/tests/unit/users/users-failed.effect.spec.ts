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
  removeUser, removeUserSuccess, unbindSocialUser, unbindSocialUserSuccess,
  UsersEffects
} from '../../../users';
import { UserService } from '../../../../services/cabinet/users/user.servise';
import { User } from '../../../../models/cabinet/users/user';
import { getUserNewCreate, getUserSecond } from '../../data/users.data';
import { UserCreateDto } from '../../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserChangePasswordDto } from '../../../../models/cabinet/users/dtos/user/user-change-password-dto';

describe('UsersFailedEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;
  const user2: User = getUserSecond();
  const userNew: UserCreateDto = getUserNewCreate();
  const userId = '22222';
  const socialId = '33333';
  let mockUserService = jasmine.createSpyObj('Service', {
    'createUser': of({status: StoreApiStatus.ERROR_MESSAGE, user: userNew}),
    'editUser': of({status: StoreApiStatus.ERROR_MESSAGE, user: user2, id: userId}),
    'changePasswordUser': of({status: StoreApiStatus.ERROR_MESSAGE, user: user2, id: userId}),
    'unbindSocial': of({status: StoreApiStatus.ERROR_MESSAGE, apiMessage: StoreApiStatus.SUCCESS}),
    'removeUser': of({status: StoreApiStatus.ERROR_MESSAGE, id: userId}),
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

  it('createUser$ should get failed', () => {
    const expectedAction = createUserSuccess({user: userNew, apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(createUser({user: userNew, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.createUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('editUser$ should get failed', () => {
    const expectedAction = editUserSuccess({userId: userId, user: user2, apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(editUser({userId: userId, user: user2, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.editUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('changePasswordUser$ should get failed', () => {
    const userPasswordDto: UserChangePasswordDto = {password: '123'};
    const expectedAction = changePasswordUserSuccess({userId: userId, user: user2, apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(changePasswordUser({userId: userId, password: userPasswordDto, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.changePasswordUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('unbindSocialUser$ should get failed', () => {
    const expectedAction = unbindSocialUserSuccess({apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(unbindSocialUser({userId: userId, socialId: socialId, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.unbindSocialUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

  it('removeUser$ should get failed', () => {
    const expectedAction = removeUserSuccess({userId: userId, apiMessage: StoreApiStatus.ERROR_MESSAGE, typeMessage: StoreApiStatus.ERROR});
    actions$ = of(removeUser({userId: userId, apiMessage: StoreApiStatus.ERROR_MESSAGE}));
    effects.removeUser$.subscribe(action => {
      expect(action).toEqual(expectedAction);
    });
  });

});
