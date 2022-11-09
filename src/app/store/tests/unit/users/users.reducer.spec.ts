import { reducer } from '../../../users/users.reducer';
import { StatusEnum } from '../../../../models/common/status/enums/statuses.enum';
import { initialState, UsersState } from '../../../users/users.state';
import {
  changePasswordUserSuccess,
  createUserSuccess,
  deleteUserSuccess,
  editUserSuccess,
  getUsers,
  getUsersSuccess, unbindSocialUser
} from '../../../users/users.actions';
import { User } from '../../../../models/cabinet/users/user';
import { UserCreateDto } from '../../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserDetailDto } from '../../../../models/cabinet/users/dtos/user/user-detail-dto';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getUserFirst, getUserNew, getUserSecond } from '../../data/users.data';
import { getRoleFirst } from '../../data/roles.data';

describe('UserReducer', () => {
  let state: UsersState;
  const user1: User = getUserFirst();
  const user2: User = getUserSecond();
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
      const user: UserCreateDto = {email: 'newuser@gmail.com', password: '123', status: StatusEnum.ACTIVE, role: getRoleFirst()};
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
      const user: UserDetailDto = getUserNew();
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = editUserSuccess({id: userId, user: user, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[1].email).toBe('newuser@gmail.com');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('changePasswordUserSuccess should change password user', () => {
      const user: User = {email: 'newuser@gmail.com', status: StatusEnum.ACTIVE, password: '123', role: getRoleFirst()};
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = changePasswordUserSuccess({id: userId, user: user, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
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
      const action = unbindSocialUser({id: userId, socialId: 'socialId', apiMessage: [StoreApiStatus.OK]});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });

    it('deleteUser should delete user', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS
      }
      const action = deleteUserSuccess({userId: userId, apiMessage: StoreApiStatus.OK, typeMessage: StoreApiStatus.SUCCESS});
      const result = reducer(state, action);

      expect(result.users.length).toBe(1);
      expect(result.apiMessage).toBe(StoreApiStatus.OK);
      expect(result.typeMessage).toBe(StoreApiStatus.SUCCESS);
    });
  });
});
