import { type } from '../../../../store/util';
import { RoutePayload } from '../../../common/store/route-payload';
import { Action } from '@ngrx/store';
import { DividendDistribution } from '../../../../services/depositAccount/domain/definition/dividend-distribution.model';

export const LOAD_ALL = type('[Deposit Product Definition Dividend] Load All');
export const LOAD_ALL_COMPLETE = type('[Deposit Product Definition Dividend] Load All Complete');

export const CREATE = type('[Deposit Product Definition Dividend] Create');
export const CREATE_SUCCESS = type('[Deposit Product Definition Dividend] Create Success');
export const CREATE_FAIL = type('[Deposit Product Definition Dividend] Create Fail');

export interface DividendPayload extends RoutePayload {
  productDefinitionId: string;
  dividendDistribution: DividendDistribution;
}

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload: string) {}
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;

  constructor(public payload: DividendDistribution[]) {}
}

export class CreateDividendDistributionAction implements Action {
  readonly type = CREATE;

  constructor(public payload: DividendPayload) {}
}

export class CreateDividendDistributionSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: DividendPayload) {}
}

export class CreateDividendDistributionFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export type Actions =
  | LoadAllAction
  | LoadAllCompleteAction
  | CreateDividendDistributionAction
  | CreateDividendDistributionSuccessAction
  | CreateDividendDistributionFailAction;
