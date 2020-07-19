/** ngrx Imports */
import { ActionReducer, combineReducers, createSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { compose } from '@ngrx/store';

/** Custom Reducers */
import * as fromAuthentication from './security/authentication.reducer';
import * as fromAuthorization from './security/authorization.reducer';
import {
  createSearchReducer,
  getSearchEntities,
  getSearchLoading,
  getSearchTotalElements,
  getSearchTotalPages,
  SearchState,
} from '../common/store/search.reducer';

/** Custom Actions */
import * as authenticationActions from './security/security.actions';

/**
 * Root State
 */
export interface State {
  authentication: fromAuthentication.State;
  authorization: fromAuthorization.State;
  roleSearch: SearchState;
}

export const reducers = {
  authentication: fromAuthentication.reducer,
  authorization: fromAuthorization.reducer,
  roleSearch: createSearchReducer('Role'),
};

export function createReducer(asyncReducers = {}): ActionReducer<any> {
  const actionReducer = compose(
    localStorageSync({
      keys: [],
      rehydrate: true,
    }),
    combineReducers,
  )(Object.assign(reducers, asyncReducers));

  return function(state: any, action: any) {
    // Reset state
    if (action.type === authenticationActions.LOGOUT_SUCCESS) {
      return actionReducer(undefined, action);
    }
    return actionReducer(state, action);
  };
}

export const productionReducer: ActionReducer<any> = createReducer();

export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}

/**
 * Role Search Selectors
 */
export const getRoleSearchState = (state: any) => state.root.roleSearch;

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

/**
 * Authentication Selectors
 */
export const getAuthenticationState = (state: any) => state.root.authentication;

export const getAuthentication = createSelector(getAuthenticationState, fromAuthentication.getAuthentication);
export const getAuthenticationError = createSelector(getAuthenticationState, fromAuthentication.getError);
export const getAuthenticationLoading = createSelector(getAuthenticationState, fromAuthentication.getLoading);
export const getUsername = createSelector(getAuthenticationState, fromAuthentication.getUsername);
export const getTenant = createSelector(getAuthenticationState, fromAuthentication.getTenant);
export const getPasswordError = createSelector(getAuthenticationState, fromAuthentication.getPasswordError);

/**
 * Authorization Selectors
 */
export const getAuthorizationState = (state: any) => state.root.authorization;

export const getPermissions = createSelector(getAuthorizationState, fromAuthorization.getPermissions);

export const getPermissionsLoading = createSelector(getAuthorizationState, fromAuthorization.getLoading);
