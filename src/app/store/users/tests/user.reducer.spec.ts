import { reducer } from '../users.reducer';
import { StatusEnum } from '../../../models/common/status/enums/statuses.enum';
import { Permission } from '../../../models/cabinet/users/permission';
import { initialState, UsersState } from '../users.state';
import {
  changePasswordUserSuccess,
  createUserSuccess,
  deleteUserSuccess,
  editUserSuccess,
  getUsers,
  getUsersSuccess, unbindSocialUser
} from '../users.actions';
import { Role } from '../../../models/cabinet/users/role';
import { User } from '../../../models/cabinet/users/user';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserDetailDto } from '../../../models/cabinet/users/dtos/user/user-detail-dto';
import {UserChangePasswordDto} from "../../../models/cabinet/users/dtos/user/user-change-password-dto";

describe('UserReducer', () => {
  let state: UsersState;
  const permission: Permission = {name: 'Permission 1', status: StatusEnum.ACTIVE};
  const role: Role = {name: 'Role 1', status: StatusEnum.ACTIVE, permissions: [permission]};
  const user1: User = {_id: '11111', email: 'user1@gmail.com', status: StatusEnum.ACTIVE, role: role};
  const user2: User = {_id: '22222', email: 'user2@gmail.com', status: StatusEnum.ACTIVE, role: role};
  const userId = '22222';
  const apiMessage = 'ok';
  const typeMessage = 'success';

  beforeEach(() => {
    state = initialState;
  });

  describe('Valid Users actions', () => {
    it('getUsers should return users', () => {
      state = {
        users: [],
        apiMessage: 'ok',
        typeMessage: 'success'
      }
      const action = getUsers();
      const result = reducer(state, action);

      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('getUsersSuccess should return users', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: 'ok',
        typeMessage: 'success'
      }
      const action = getUsersSuccess({users: users});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[0].email).toBe('user1@gmail.com');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('createUserSuccess should create user', () => {
      const user: UserCreateDto = {email: 'newuser@gmail.com', password: '123', status: StatusEnum.ACTIVE, role: role};
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = createUserSuccess({user: user, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.users.length).toBe(3);
      expect(result.users[2].email).toBe('newuser@gmail.com');
      expect(result.users[2].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe('ok');
      expect(result.typeMessage).toBe('success');
    });

    it('editUserSuccess should edit user', () => {
      const user: UserDetailDto = {_id: userId, email: 'newuser@gmail.com', status: StatusEnum.ACTIVE, role: role, socials: [], permission: []};
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = editUserSuccess({id: userId, user: user, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[1].email).toBe('newuser@gmail.com');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });

    it('changePasswordUserSuccess should change password user', () => {
      const user: User = {email: 'newuser@gmail.com', status: StatusEnum.ACTIVE, password: '123', role: role};
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = changePasswordUserSuccess({id: userId, user: user, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.users[1].password).toBe('123');
      expect(result.users[1].status).toBe(StatusEnum.ACTIVE);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });

    it('unbindSocialUser should unbind social from user', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = unbindSocialUser({id: userId, socialId: 'socialId', apiMessage: [apiMessage]});
      const result = reducer(state, action);

      expect(result.users.length).toBe(2);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });

    it('deleteUser should delete user', () => {
      const users = [user1, user2];
      state = {
        users: users,
        apiMessage: apiMessage,
        typeMessage: typeMessage
      }
      const action = deleteUserSuccess({userId: userId, apiMessage: apiMessage, typeMessage: typeMessage});
      const result = reducer(state, action);

      expect(result.users.length).toBe(1);
      expect(result.apiMessage).toBe(apiMessage);
      expect(result.typeMessage).toBe(typeMessage);
    });
  });
});
