import { type } from '../../../../store/util';
import { Action } from '@ngrx/store';
import { RoutePayload } from '../../../common/store/route-payload';
import { PayrollConfiguration } from '../../../../services/payroll/domain/payroll-configuration.model';

export const LOAD = type('[Customer Payroll] Load');

export const UPDATE = type('[Customer Payroll] Update');
export const UPDATE_SUCCESS = type('[Customer Payroll] Update Success');
export const UPDATE_FAIL = type('[Customer Payroll] Update Fail');

export interface PayrollDistributionRoutePayload extends RoutePayload {
  customerId: string;
  distribution: PayrollConfiguration;
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: PayrollConfiguration) {}
}

export class UpdatePayrollDistributionAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: PayrollDistributionRoutePayload) {}
}

export class UpdatePayrollDistributionSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: PayrollDistributionRoutePayload) {}
}

export class UpdatePayrollDistributionFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export type Actions =
  | LoadAction
  | UpdatePayrollDistributionAction
  | UpdatePayrollDistributionSuccessAction
  | UpdatePayrollDistributionFailAction;
