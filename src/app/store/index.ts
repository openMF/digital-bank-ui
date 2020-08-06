/** ngrx Imports */
import { ActionReducer, combineReducers, createSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { compose } from '@ngrx/store';

/** Custom Reducers */
import * as fromAuthentication from './security/authentication.reducer';
import * as fromAuthorization from './security/authorization.reducer';

/** Custom Actions */
import * as authenticationActions from './security/security.actions';

import {
  createSearchReducer,
  getSearchEntities,
  getSearchLoading,
  getSearchTotalElements,
  getSearchTotalPages,
  SearchState,
} from '../main/common/store/search.reducer';

import { roleFeatureKey } from '../main/role/store/index';
import { userFeatureKey } from '../main/user/store/index';
import { customerFeatureKey } from '../main/customer/store/index';
import { officeFeatureKey } from '../main/office/store/index';

export const rootFeatureKey = 'Root';

/**
 * Root State
 */
export interface State {
  authentication: fromAuthentication.State;
  authorization: fromAuthorization.State;
  roleSearch: SearchState;
  userSearch: SearchState;
  customerSearch: SearchState;
  officeSearch: SearchState;
}

/**
 * Root Reducers
 */
export const reducers = {
  authentication: fromAuthentication.reducer,
  authorization: fromAuthorization.reducer,
  roleSearch: createSearchReducer(roleFeatureKey),
  userSearch: createSearchReducer(userFeatureKey),
  customerSearch: createSearchReducer(customerFeatureKey),
  officeSearch: createSearchReducer(officeFeatureKey),
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
 * Authentication Selectors
 */
export const getAuthenticationState = (state: any) => state[rootFeatureKey].authentication;

export const getAuthentication = createSelector(getAuthenticationState, fromAuthentication.getAuthentication);
export const getAuthenticationError = createSelector(getAuthenticationState, fromAuthentication.getError);
export const getAuthenticationLoading = createSelector(getAuthenticationState, fromAuthentication.getLoading);
export const getUsername = createSelector(getAuthenticationState, fromAuthentication.getUsername);
export const getTenant = createSelector(getAuthenticationState, fromAuthentication.getTenant);
export const getPasswordError = createSelector(getAuthenticationState, fromAuthentication.getPasswordError);

/**
 * Authorization Selectors
 */
export const getAuthorizationState = (state: any) => state[rootFeatureKey].authorization;

export const getPermissions = createSelector(getAuthorizationState, fromAuthorization.getPermissions);

export const getPermissionsLoading = createSelector(getAuthorizationState, fromAuthorization.getLoading);

/**
 * Role Search Selectors
 */
export const getRoleSearchState = (state: any) => state[rootFeatureKey].roleSearch;
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
 * User Search Selectors
 */
export const getUserSearchState = (state: any) => state[rootFeatureKey].userSearch;
export const getSearchUsers = createSelector(getUserSearchState, getSearchEntities);
export const getUserSearchTotalElements = createSelector(getUserSearchState, getSearchTotalElements);
export const getUserSearchTotalPages = createSelector(getUserSearchState, getSearchTotalPages);
export const getUserSearchLoading = createSelector(getUserSearchState, getSearchLoading);

export const getUserSearchResults = createSelector(
  getSearchUsers,
  getUserSearchTotalPages,
  getUserSearchTotalElements,
  (users, totalPages, totalElements) => {
    return {
      users: users,
      totalPages: totalPages,
      totalElements: totalElements,
    };
  },
);

/**
 * Customer Search Selectors
 */
export const getCustomerSearchState = (state: State) => state[rootFeatureKey].customerSearch;
export const getSearchCustomers = createSelector(getCustomerSearchState, getSearchEntities);
export const getCustomerSearchTotalElements = createSelector(getCustomerSearchState, getSearchTotalElements);
export const getCustomerSearchTotalPages = createSelector(getCustomerSearchState, getSearchTotalPages);
export const getCustomerSearchLoading = createSelector(getCustomerSearchState, getSearchLoading);

export const getCustomerSearchResults = createSelector(
  getSearchCustomers,
  getCustomerSearchTotalPages,
  getCustomerSearchTotalElements,
  (customers, totalPages, totalElements) => {
    return {
      customers: customers,
      totalPages: totalPages,
      totalElements: totalElements,
    };
  },
);

/**
 * Office Search Selectors
 */
export const getOfficeSearchState = (state: any) => state[rootFeatureKey].officeSearch;
export const getSearchOffices = createSelector(getOfficeSearchState, getSearchEntities);
export const getOfficeSearchTotalElements = createSelector(getOfficeSearchState, getSearchTotalElements);
export const getOfficeSearchTotalPages = createSelector(getOfficeSearchState, getSearchTotalPages);
export const getOfficeSearchLoading = createSelector(getOfficeSearchState, getSearchLoading);

export const getOfficeSearchResults = createSelector(
  getSearchOffices,
  getOfficeSearchTotalPages,
  getOfficeSearchTotalElements,
  (offices, totalPages, totalElements) => {
    return {
      offices: offices,
      totalPages: totalPages,
      totalElements: totalElements,
    };
  },
);
