import { Action } from '@ngrx/store';
import { type } from '../../../store/util';
import { Error } from '../../../services/domain/error.model';
import { Customer } from '../../../services/customer/domain/customer.model';
import { RoutePayload } from '../../common/store/route-payload';
import {
  CreateResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../common/store/resource.reducer';

export const LOAD = type('[Customer] Load');
export const SELECT = type('[Customer] Select');

export const CREATE = type('[Customer] Create');
export const CREATE_SUCCESS = type('[Customer] Create Success');
export const CREATE_FAIL = type('[Customer] Create Fail');

export const UPDATE = type('[Customer] Update');
export const UPDATE_SUCCESS = type('[Customer] Update Success');
export const UPDATE_FAIL = type('[Customer] Update Fail');

export const RESET_FORM = type('[Customer] Reset Form');

export interface CustomerRoutePayload extends RoutePayload {
  customer: Customer;
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateCustomerAction implements Action {
  readonly type = CREATE;

  constructor(public payload: CustomerRoutePayload) {}
}

export class CreateCustomerSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateCustomerFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateCustomerAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: CustomerRoutePayload) {}
}

export class UpdateCustomerSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateCustomerFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class ResetCustomerFormAction implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions =
  | LoadAction
  | SelectAction
  | CreateCustomerAction
  | CreateCustomerSuccessAction
  | CreateCustomerFailAction
  | UpdateCustomerAction
  | UpdateCustomerSuccessAction
  | UpdateCustomerFailAction
  | ResetCustomerFormAction;
