import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../../common/store/resource.reducer';
import * as fromCustomer from '../../store';
import {
  createSearchReducer,
  getSearchEntities,
  getSearchTotalElements,
  getSearchTotalPages,
  SearchState,
} from '../../../common/store/search.reducer';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';

export const customerDepositFeatureKey = 'Deposit';

export interface CustomerDepositState {
  deposits: ResourceState;
  depositSearch: SearchState;
}

export interface State extends fromCustomer.State {
  [customerDepositFeatureKey]: CustomerDepositState;
}

export function reducers(state: CustomerDepositState | undefined, action: Action) {
  return combineReducers({
    deposits: createResourceReducer('Deposit', undefined, 'accountIdentifier'),
    depositSearch: createSearchReducer('Deposit'),
  })(state, action);
}

/**
 * Selects Deposit State from the customer state object.
 */
export const getCustomerDepositSearchState = createFeatureSelector<State, CustomerDepositState>(customerDepositFeatureKey);

export const getDepositSearchState = createSelector(getCustomerDepositSearchState, state => state.depositSearch);
export const getSearchDeposits = createSelector(getDepositSearchState, getSearchEntities);
export const getDepositSearchTotalElements = createSelector(getDepositSearchState, getSearchTotalElements);
export const getDepositSearchTotalPages = createSelector(getDepositSearchState, getSearchTotalPages);

export const getDepositSearchResults = createSelector(
  getSearchDeposits,
  getDepositSearchTotalPages,
  getDepositSearchTotalElements,
  (deposits, totalPages, totalElements) => {
    return {
      deposits,
      totalPages,
      totalElements,
    };
  },
);

export const getDepositsState = createSelector(getCustomerDepositSearchState, state => state.deposits);

export const getDepositsLoadedAt = createSelector(getDepositsState, getResourceLoadedAt);
export const getSelectedDepositInstance = createSelector(getDepositsState, getResourceSelected);
