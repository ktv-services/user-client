import { UsersState } from './users';
import { RolesState } from './roles';


export interface State {
  users: UsersState;
  roles: RolesState;
}
