import * as fromRoot from '../../../store';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import {
  createSearchReducer,
  getSearchEntities,
  getSearchLoading,
  getSearchTotalElements,
  getSearchTotalPages,
  SearchState,
} from '../../common/store/search.reducer';

export const userFeatureKey = 'User';

export interface UserState {
  userSearch: SearchState;
}

export interface State extends fromRoot.State {
  [userFeatureKey]: UserState;
}

export function reducers(state: UserState | undefined, action: Action) {
  return combineReducers({
    userSearch: createSearchReducer(userFeatureKey),
  })(state, action);
}

/**
 * Selects Users State from the root of the state object.
 */
export const selectUserState = createFeatureSelector<State, UserState>(userFeatureKey);

/**
 * User Search Selectors
 */
export const getUserSearchState = createSelector(selectUserState, state => state.userSearch);
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
