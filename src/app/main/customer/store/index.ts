import * as fromRoot from '../../../store';
import * as fromCustomers from './customers.reducer';
import * as fromCustomerTasks from './customerTasks/customer-tasks.reducer';
import * as fromCustomerIdentificationCards from './identityCards/identity-cards.reducer';
import * as fromCatalogs from './catalogs/catalog.reducer';
import * as fromCommands from './commands/commands.reducer';
import * as fromScans from './identityCards/scans/scans.reducer';
import * as fromTasks from './tasks/tasks.reducer';
import * as fromPayrollDistribution from './payroll/payroll.reducer';
import { createSelector, combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import {
  createResourceReducer,
  getResourceAll,
  getResourceLoadedAt,
  getResourceSelected,
  ResourceState,
} from '../../common/store/resource.reducer';
import { createFormReducer, FormState, getFormError } from '../../common/store/form.reducer';

export const customerFeatureKey = 'Customer';

export interface CustomerState {
  customers: ResourceState;
  customerForm: FormState;
  tasks: ResourceState;
  taskForm: FormState;
  customerTasks: fromCustomerTasks.State;
  customerCatalog: fromCatalogs.State;
  customerCommands: fromCommands.State;
  customerIdentificationCards: ResourceState;
  customerIdentificationCardForm: FormState;
  customerIdentificationCardScans: ResourceState;
  customerIdentificationCardScanForm: FormState;
  customerPayrollDistribution: fromPayrollDistribution.State;
}

export interface State extends fromRoot.State {
  [customerFeatureKey]: CustomerState;
}

export function reducers(state: CustomerState | undefined, action: Action) {
  return combineReducers({
    customers: createResourceReducer(customerFeatureKey, fromCustomers.reducer),
    customerForm: createFormReducer(customerFeatureKey),
    tasks: createResourceReducer('Task', fromTasks.reducer),
    taskForm: createFormReducer('Task'),
    customerTasks: fromCustomerTasks.reducer,
    customerCatalog: fromCatalogs.reducer,
    customerCommands: fromCommands.reducer,
    customerIdentificationCards: createResourceReducer('Customer Identity Card', fromCustomerIdentificationCards.reducer, 'number'),
    customerIdentificationCardForm: createFormReducer('Customer Identity Card'),
    customerIdentificationCardScans: createResourceReducer('Customer Identity Card Scan', fromScans.reducer),
    customerIdentificationCardScanForm: createFormReducer('Customer Identity Card Scan'),
    customerPayrollDistribution: fromPayrollDistribution.reducer,
  })(state, action);
}

/**
 * Selects Roles State from the root of the state object.
 */
export const selectCustomerState = createFeatureSelector<State, CustomerState>(customerFeatureKey);

export const getCustomerFormState = createSelector(selectCustomerState, state => state.customerForm);
export const getCustomerFormError = createSelector(getCustomerFormState, getFormError);

export const getCustomersState = createSelector(selectCustomerState, state => state.customers);
export const getCustomerLoadedAt = createSelector(getCustomersState, getResourceLoadedAt);
export const getSelectedCustomer = createSelector(getCustomersState, getResourceSelected);

/**
 * Task Selectors
 */
export const getTasksState = createSelector(selectCustomerState, state => state.tasks);

export const getAllTaskEntities = createSelector(getTasksState, getResourceAll);
export const getTaskLoadedAt = createSelector(getTasksState, getResourceLoadedAt);
export const getSelectedTask = createSelector(getTasksState, getResourceSelected);

/**
 * Customer Task Selectors
 */
export const getCustomerTaskCommandsState = createSelector(selectCustomerState, state => state.customerTasks);

export const getCustomerTaskProcessSteps = createSelector(getCustomerTaskCommandsState, fromCustomerTasks.getProcessSteps);

/**
 * Customer Command Selectors
 */

export const getCustomerCommandsState = createSelector(selectCustomerState, state => state.customerCommands);

export const getAllCustomerCommands = createSelector(getCustomerCommandsState, fromCommands.getCommands);

/**
 * Customer Identification Card Selectors
 */
export const getCustomerIdentificationCardsState = createSelector(selectCustomerState, state => state.customerIdentificationCards);

export const getAllCustomerIdentificationCardEntities = createSelector(getCustomerIdentificationCardsState, getResourceAll);

export const getCustomerIdentificationCardFormState = createSelector(selectCustomerState, state => state.customerIdentificationCardForm);
export const getCustomerIdentificationCardFormError = createSelector(getCustomerIdentificationCardFormState, getFormError);

export const getIdentificationCardLoadedAt = createSelector(getCustomerIdentificationCardsState, getResourceLoadedAt);
export const getSelectedIdentificationCard = createSelector(getCustomerIdentificationCardsState, getResourceSelected);

/**
 * Customer Identification Card Scan Selectors
 */
export const getIdentificationCardScansState = createSelector(selectCustomerState, state => state.customerIdentificationCardScans);

export const getAllIdentificationCardScanEntities = createSelector(getIdentificationCardScansState, getResourceAll);

export const getCustomerIdentificationCardScanFormState = createSelector(
  selectCustomerState,
  state => state.customerIdentificationCardScanForm,
);
export const getCustomerIdentificationCardScanFormError = createSelector(getCustomerIdentificationCardScanFormState, getFormError);

/**
 * Customer Payroll Distribution Selectors
 */
export const getPayrollDistributionState = createSelector(selectCustomerState, state => state.customerPayrollDistribution);

export const getPayrollDistribution = createSelector(getPayrollDistributionState, fromPayrollDistribution.getPayrollDistribution);
export const getPayrollDistributionLoadedAt = createSelector(
  getPayrollDistributionState,
  fromPayrollDistribution.getPayrollDistributionLoadedAt,
);

/**
 * Customer Catalog Selectors
 */
export const getCustomerCatalogState = createSelector(selectCustomerState, state => state.customerCatalog);

export const getCustomerCatalog = createSelector(getCustomerCatalogState, fromCatalogs.getCustomerCatalog);
export const getCustomerCatalogLoadedAt = createSelector(getCustomerCatalogState, fromCatalogs.getCustomerCatalogLoadedAt);
export const getSelectedField = createSelector(getCustomerCatalogState, fromCatalogs.getSelectedField);
