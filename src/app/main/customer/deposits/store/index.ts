import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../../common/store/resource.reducer';
import * as fromCustomer from '../../store';

import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';

export const customerDepositFeatureKey = 'Deposit';

export interface CustomerDepositState {
  deposits: ResourceState;
}

export interface State extends fromCustomer.State {
  [customerDepositFeatureKey]: CustomerDepositState;
}

export function reducers(state: CustomerDepositState | undefined, action: Action) {
  return combineReducers({
    deposits: createResourceReducer('Deposit', undefined, 'accountIdentifier'),
  })(state, action);
}

/**
 * Selects Deposit State from the customer state object.
 */
export const getCustomerDepositState = createFeatureSelector<State, CustomerDepositState>(customerDepositFeatureKey);

export const getDepositsState = createSelector(getCustomerDepositState, state => state.deposits);

export const getDepositsLoadedAt = createSelector(getDepositsState, getResourceLoadedAt);
export const getSelectedDepositInstance = createSelector(getDepositsState, getResourceSelected);
