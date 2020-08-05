import * as fromRoot from '../../../store';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../common/store/resource.reducer';
import { createFormReducer, FormState, getFormError } from '../../common/store/form.reducer';

export const userFeatureKey = 'User';

export interface UserState {
  users: ResourceState;
  userForm: FormState;
}

export interface State extends fromRoot.State {
  [userFeatureKey]: UserState;
}

export function reducers(state: UserState | undefined, action: Action) {
  return combineReducers({
    users: createResourceReducer(userFeatureKey),
    userForm: createFormReducer(userFeatureKey),
  })(state, action);
}

/**
 * Selects Users State from the root of the state object.
 */
export const selectUserState = createFeatureSelector<State, UserState>(userFeatureKey);

export const getUserFormState = createSelector(selectUserState, state => state.userForm);
export const getUserFormError = createSelector(getUserFormState, getFormError);

export const getUsersState = createSelector(selectUserState, state => state.users);
export const getUsersLoadedAt = createSelector(getUsersState, getResourceLoadedAt);
export const getSelectedUser = createSelector(getUsersState, getResourceSelected);
