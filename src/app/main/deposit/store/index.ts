import { createFormReducer, FormState, getFormError } from '../../common/store/form.reducer';
import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../common/store/resource.reducer';
import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromProducts from './products.reducer';
import * as fromDividends from './dividends/dividends.reducer';
import {
  createSearchReducer,
  getSearchEntities,
  getSearchTotalElements,
  getSearchTotalPages,
  SearchState,
} from '../../common/store/search.reducer';

export const depositProductsFeatureKey = 'Deposit Product Definition';

export interface DepositProductsState {
  depositProducts: ResourceState;
  depositProductForm: FormState;
  depositProductSearch: SearchState;
  depositProductDividends: fromDividends.State;
}

export interface State extends fromRoot.State {
  [depositProductsFeatureKey]: DepositProductsState;
}

export function reducers(state: DepositProductsState | undefined, action: Action) {
  return combineReducers({
    depositProducts: createResourceReducer(depositProductsFeatureKey, fromProducts.reducer),
    depositProductForm: createFormReducer(depositProductsFeatureKey),
    depositProductSearch: createSearchReducer(depositProductsFeatureKey),
    depositProductDividends: fromDividends.reducer,
  })(state, action);
}

/**
 * Selects Product State from the root of the state object.
 */
export const selectDepositProductsState = createFeatureSelector<State, DepositProductsState>(depositProductsFeatureKey);

export const getProductFormState = createSelector(selectDepositProductsState, state => state.depositProductForm);
export const getProductFormError = createSelector(getProductFormState, getFormError);

export const getProductsState = createSelector(selectDepositProductsState, state => state.depositProducts);
export const getProductsLoadedAt = createSelector(getProductsState, getResourceLoadedAt);
export const getSelectedProduct = createSelector(getProductsState, getResourceSelected);

/**
 * Product search selector
 */
export const getProductSearchState = createSelector(selectDepositProductsState, state => state.depositProductSearch);

export const getSearchProducts = createSelector(getProductSearchState, getSearchEntities);
export const getProductSearchTotalElements = createSelector(getProductSearchState, getSearchTotalElements);
export const getProductSearchTotalPages = createSelector(getProductSearchState, getSearchTotalPages);

export const getProductSearchResults = createSelector(
  getSearchProducts,
  getProductSearchTotalPages,
  getProductSearchTotalElements,
  (products, totalPages, totalElements) => {
    return {
      products: products,
      totalPages: totalPages,
      totalElements: totalElements,
    };
  },
);

export const getProductDividendsState = createSelector(selectDepositProductsState, state => state.depositProductDividends);
export const getDividends = createSelector(getProductDividendsState, fromDividends.getDividends);
