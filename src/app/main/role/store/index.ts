import * as fromRoot from '../../../store';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../common/store/resource.reducer';
import { createFormReducer, FormState, getFormError } from '../../common/store/form.reducer';

export const roleFeatureKey = 'Role';

export interface RoleState {
  roles: ResourceState;
  roleForm: FormState;
}

export interface State extends fromRoot.State {
  [roleFeatureKey]: RoleState;
}

export function reducers(state: RoleState | undefined, action: Action) {
  return combineReducers({
    roles: createResourceReducer(roleFeatureKey),
    roleForm: createFormReducer(roleFeatureKey),
  })(state, action);
}

/**
 * Selects Roles State from the root of the state object.
 */
export const selectRoleState = createFeatureSelector<State, RoleState>(roleFeatureKey);

export const getRoleFormState = createSelector(selectRoleState, state => state.roleForm);
export const getRoleFormError = createSelector(getRoleFormState, getFormError);

export const getRolesState = createSelector(selectRoleState, state => state.roles);
export const getRolesLoadedAt = createSelector(getRolesState, getResourceLoadedAt);
export const getSelectedRole = createSelector(getRolesState, getResourceSelected);
