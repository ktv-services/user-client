import { reducer } from '../../../users/users.reducer';
import { StatusEnum } from '../../../../models/common/status/enums/statuses.enum';
import { initialState, UsersState } from '../../../users/users.state';
import {
  changePasswordUserSuccess,
  createUserSuccess,
  removeUserSuccess,
  editUserSuccess,
  getUsers,
  getUsersSuccess, unbindSocialUser
} from '../../../users/users.actions';
import { User } from '../../../../models/cabinet/users/user';
import { UserCreateDto } from '../../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserDetailDto } from '../../../../models/cabinet/users/dtos/user/user-detail-dto';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getUserFirst, getUserNew, getUserSecond } from '../../../../testing/data/users.data';
import { getRoleFirst, getRoleSecond } from '../../../../testing/data/roles.data';
import { Role } from '../../../../models/cabinet/users/role';
import { getPermissionFirst } from '../../../../testing/data/permissions.data';

describe('UserReducer', () => {
  let state: UsersState;
  const permission = getPermissionFirst();
  const role1: Role = getRoleFirst(permission);
  const role2: Role = getRoleSecond();
  const user1: User = getUserFirst(role1);
  const user2: User = getUserSecond(role2);
  const userId = '22222';

  beforeEach(() => {
    state = initialState;
  });

  describe('Valid Users actions', () => {
    it('getUsers should return users', () => {
      state = {
        users: [],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = getUsers();
      const result = reducer(state, action);

      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('getUsersSuccess should return users', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const action = getUsersSuccess({users: users});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[0].email).toBe('user1@gmail.com');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('createUserSuccess should create user', () => {
      const user: UserCreateDto = {email: 'newuser@gmail.com', password: '123', status: StatusEnum.ACTIVE, role: getRoleFirst(permission)};
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = createUserSuccess({user: user, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.users.length).toBe(3);
      expect(result.users[2].email).toBe('newuser@gmail.com');
      expect(result.users[2].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('editUserSuccess should edit user', () => {
      const user: UserDetailDto = getUserNew(role1);
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = editUserSuccess({userId: userId, user: user, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[1].email).toBe('newuser@gmail.com');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('changePasswordUserSuccess should change password user', () => {
      const user: User = {email: 'newuser@gmail.com', status: StatusEnum.ACTIVE, password: '123', role: getRoleFirst(permission)};
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = changePasswordUserSuccess({userId: userId, user: user, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[1].password).toBe('123');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('unbindSocialUser should unbind social from user', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = unbindSocialUser({userId: userId, socialId: 'socialId', apiMessage: StoreApiStatus.OK});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('removeUser should delete user', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = removeUserSuccess({userId: userId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.users.length).toBe(1);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });
  });
});
