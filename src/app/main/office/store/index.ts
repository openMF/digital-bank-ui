import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromTellers from '../store/teller/tellers.reducer';
import * as fromDenominations from '../store/teller/denomination/denominations.reducer';

import {
  createResourceReducer,
  getResourceAll,
  getResourceEntities,
  getResourceLoadedAt,
  getResourceSelected,
  ResourceState,
} from '../../common/store/resource.reducer';
import { createFormReducer, FormState, getFormError } from '../../common/store/form.reducer';

export const officeFeatureKey = 'Office';
export const officeTellerFeatureKey = 'Office Teller';

export interface OfficeState {
  offices: ResourceState;
  officeForm: FormState;
  tellers: ResourceState;
  tellerForm: FormState;
  denominations: fromDenominations.State;
}

export interface State extends fromRoot.State {
  [officeFeatureKey]: OfficeState;
}

export function reducers(state: OfficeState | undefined, action: Action) {
  return combineReducers({
    offices: createResourceReducer(officeFeatureKey),
    officeForm: createFormReducer(officeFeatureKey),
    tellers: createResourceReducer(officeTellerFeatureKey, fromTellers.reducer, 'code'),
    tellerForm: createFormReducer(officeTellerFeatureKey),
    denominations: fromDenominations.reducer,
  })(state, action);
}

/**
 * Selects Office State from the root of the state object.
 */
export const selectOfficeState = createFeatureSelector<State, OfficeState>(officeFeatureKey);

export const getOfficeFormState = createSelector(selectOfficeState, state => state.officeForm);
export const getOfficeFormError = createSelector(getOfficeFormState, getFormError);

export const getOfficesState = createSelector(selectOfficeState, state => state.offices);
export const getOfficeEntities = createSelector(getOfficesState, getResourceEntities);
export const getOfficesLoadedAt = createSelector(getOfficesState, getResourceLoadedAt);
export const getSelectedOffice = createSelector(getOfficesState, getResourceSelected);

export const getTellerFormState = createSelector(selectOfficeState, state => state.tellerForm);
export const getTellerFormError = createSelector(getTellerFormState, getFormError);

export const getTellerState = createSelector(selectOfficeState, state => state.tellers);
export const getAllTellerEntities = createSelector(getTellerState, getResourceAll);
export const getTellersLoadedAt = createSelector(getTellerState, getResourceLoadedAt);
export const getSelectedTeller = createSelector(getTellerState, getResourceSelected);

export const getDenominationState = createSelector(selectOfficeState, state => state.denominations);
export const getDenominationsEntities = createSelector(getDenominationState, fromDenominations.getDenominationEntities);
