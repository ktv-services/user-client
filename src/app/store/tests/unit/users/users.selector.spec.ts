import * as UsersSelector from '../../../users/users.selector';
import { User } from '../../../../models/cabinet/users/user';
import { initialState, UsersState } from '../../../users/users.state';
import { StoreApiStatus } from '../../../../models/common/store/enums/store-api-status.enum';
import { getUserFirst, getUserSecond } from '../../../../testing/data/users.data';
import { Role } from '../../../../models/cabinet/users/role';
import { getRoleFirst } from '../../../../testing/data/roles.data';
import { getPermissionFirst } from '../../../../testing/data/permissions.data';

describe('UserSelectors', () => {
  let state: UsersState;
  const permission = getPermissionFirst();
  const role1: Role = getRoleFirst(permission);
  const user1: User = getUserFirst(role1);
  const user2: User = getUserSecond(role1);
  const userId = '22222';

  beforeEach(() => {
    state = initialState;
  });

  describe('User Selectors', () => {
    it('selectUserItems should return users', () => {
      state = {
        users: [user1, user2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const results: any = UsersSelector.selectUserItems.projector(state);
      expect(results[0].email).toBe('user1@gmail.com');
      expect(results[1].email).toBe('user2@gmail.com');
    });

    it('selectUserItem should return user', () => {
      state = {
        users: [user1, user2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const results: any = UsersSelector.selectUserItem({id: userId}).projector(state.users);
      expect(results.email).toBe('user2@gmail.com');
    });

    it('selectApiMessageItem should return api message', () => {
      state = {
        users: [user1, user2],
        apiMessage: StoreApiStatus.OK,
        typeMessage: StoreApiStatus.SUCCESS,
      }
      const results: any = UsersSelector.selectApiMessageItem.projector(state);
      expect(results.apiMessage).toBe('ok');
    });

  });
});
