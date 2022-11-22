import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPermissions from './permissions.reducer';
import { PermissionsState } from './permissions.state';
import { Permission } from '../../models/cabinet/users/permission';

export const selectPermissions = createFeatureSelector<PermissionsState>('permissions');

export const selectPermissionItems = createSelector(
  selectPermissions,
  fromPermissions.getPermissionsReducer
);

export const selectPermissionItem = (props: { id: string }) =>
  createSelector(selectPermissionItems, (permissions: Permission[]) => {
      return permissions.find((permission: Permission) => permission._id === props.id);
    }
  );

export const selectApiMessageItem = createSelector(
  selectPermissions,
  fromPermissions.getApiMessageReducer
);
