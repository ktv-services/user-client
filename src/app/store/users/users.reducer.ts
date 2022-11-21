import { Action, createReducer, on } from '@ngrx/store';
import { initialState, UsersState } from './users.state';
import * as UserActions from './users.actions';
import { User } from '../../models/cabinet/users/user';
import {removeUser} from "./users.actions";


const usersReducer = createReducer(
  initialState,
  on(UserActions.getUsers, (state) => ({...state})),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(UserActions.createUserSuccess, (state, { user, apiMessage }) => {
    const updatedUsers = [...state.users];
    updatedUsers.push(user as User);
    return {
      ...state,
      users: updatedUsers,
      apiMessage: apiMessage
    };
  }),
  on(UserActions.editUserSuccess, (state, { userId, user, apiMessage }) => {
    const userItemIndex = state.users.findIndex(
      (item) => item._id === userId
    );
    const updatedUsers = [...state.users];
    updatedUsers.splice(userItemIndex, 1);
    updatedUsers.push(user);
    return {
      ...state,
      users: updatedUsers,
      apiMessage: apiMessage
    };
  }),
  on(UserActions.changePasswordUserSuccess, (state, { userId, user, apiMessage }) => {
    const userItemIndex = state.users.findIndex(
      (item) => item._id === userId
    );
    const updatedUsers = [...state.users];
    updatedUsers.splice(userItemIndex, 1);
    updatedUsers.push(user);
    return {
      ...state,
      users: updatedUsers,
      apiMessage: apiMessage
    };
  }),
  on(UserActions.unbindSocialUserSuccess, (state, { apiMessage }) => {
    return {
      ...state,
      users: state.users,
      apiMessage: apiMessage
    };
  }),
  on(UserActions.removeUserSuccess, (state, { userId, apiMessage }) => {
    const userItemIndex = state.users.findIndex(
      (item) => item._id === userId
    );
    const updatedUsers = [...state.users];
    updatedUsers.splice(userItemIndex, 1);
    return {
      ...state,
      users: updatedUsers,
      apiMessage: apiMessage
    };
  })
);

export const getUsersReducer = (state: UsersState): any => {
  return state.users;
};

export const getApiMessageReducer = (state: UsersState) => {
  return {
    apiMessage: state.apiMessage,
    typeMessage: state.typeMessage
  };
};

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
