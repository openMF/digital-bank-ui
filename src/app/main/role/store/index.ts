import * as fromRoot from '../../../store';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../common/store/resource.reducer';
import { createFormReducer, FormState, getFormError } from '../../common/store/form.reducer';
import {
  createSearchReducer,
  getSearchEntities,
  getSearchLoading,
  getSearchTotalElements,
  getSearchTotalPages,
  SearchState,
} from '../../common/store/search.reducer';

export const roleFeatureKey = 'Role';

export interface RoleState {
  roleSearch: SearchState;
  roles: ResourceState;
  roleForm: FormState;
}

export interface State extends fromRoot.State {
  [roleFeatureKey]: RoleState;
}

export function reducers(state: RoleState | undefined, action: Action) {
  return combineReducers({
    roleSearch: createSearchReducer(roleFeatureKey),
    roles: createResourceReducer(roleFeatureKey),
    roleForm: createFormReducer(roleFeatureKey),
  })(state, action);
}

/**
 * Selects Roles State from the root of the state object.
 */
export const selectRoleState = createFeatureSelector<State, RoleState>(roleFeatureKey);

/**
 * Role Search Selectors
 */
export const getRoleSearchState = createSelector(selectRoleState, state => state.roleSearch);
export const getSearchRoles = createSelector(getRoleSearchState, getSearchEntities);
export const getRoleSearchTotalElements = createSelector(getRoleSearchState, getSearchTotalElements);
export const getRoleSearchTotalPages = createSelector(getRoleSearchState, getSearchTotalPages);
export const getRoleSearchLoading = createSelector(getRoleSearchState, getSearchLoading);

export const getRoleSearchResults = createSelector(
  getSearchRoles,
  getRoleSearchTotalPages,
  getRoleSearchTotalElements,
  (roles, totalPages, totalElements) => {
    return {
      roles: roles,
      totalPages: totalPages,
      totalElements: totalElements,
    };
  },
);

export const getRoleFormState = createSelector(selectRoleState, state => state.roleForm);
export const getRoleFormError = createSelector(getRoleFormState, getFormError);

export const getRolesState = createSelector(selectRoleState, state => state.roles);
export const getRolesLoadedAt = createSelector(getRolesState, getResourceLoadedAt);
export const getSelectedRole = createSelector(getRolesState, getResourceSelected);
