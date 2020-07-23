/** ngrx Imports */
import { ActionReducer, combineReducers, createSelector } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { compose } from '@ngrx/store';

/** Custom Reducers */
import * as fromAuthentication from './security/authentication.reducer';
import * as fromAuthorization from './security/authorization.reducer';

/** Custom Actions */
import * as authenticationActions from './security/security.actions';

export const rootFeatureKey = 'Root';

/**
 * Root State
 */
export interface State {
  authentication: fromAuthentication.State;
  authorization: fromAuthorization.State;
}

/**
 * Root Reducers
 */
export const reducers = {
  authentication: fromAuthentication.reducer,
  authorization: fromAuthorization.reducer,
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
