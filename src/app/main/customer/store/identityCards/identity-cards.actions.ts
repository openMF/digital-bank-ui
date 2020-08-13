import { type } from '../../../../store/util';
import { RoutePayload } from '../../../common/store/route-payload';
import { IdentificationCard } from '../../../../services/customer/domain/identification-card.model';
import { Action } from '@ngrx/store';
import {
  CreateResourceSuccessPayload,
  DeleteResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../../common/store/resource.reducer';
import { Error } from '../../../../services/domain/error.model';

export const LOAD_ALL = type('[Customer Identity Card] Load All');
export const LOAD_ALL_COMPLETE = type('[Customer Identity Card] Load All Complete');

export const LOAD = type('[Customer Identity Card] Load');
export const SELECT = type('[Customer Identity Card] Select');

export const CREATE = type('[Customer Identity Card] Create');
export const CREATE_SUCCESS = type('[Customer Identity Card] Create Success');
export const CREATE_FAIL = type('[Customer Identity Card] Create Fail');

export const UPDATE = type('[Customer Identity Card] Update');
export const UPDATE_SUCCESS = type('[Customer Identity Card] Update Success');
export const UPDATE_FAIL = type('[Customer Identity Card] Update Fail');

export const DELETE = type('[Customer Identity Card] Delete');
export const DELETE_SUCCESS = type('[Customer Identity Card] Delete Success');
export const DELETE_FAIL = type('[Customer Identity Card] Delete Fail');

export const RESET_FORM = type('[Customer Identity Card] Reset Form');

export interface IdentityCardPayload extends RoutePayload {
  customerId: string;
  identificationCard: IdentificationCard;
}

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload: string) {}
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;

  constructor(public payload: IdentificationCard[]) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateIdentityCardAction implements Action {
  readonly type = CREATE;

  constructor(public payload: IdentityCardPayload) {}
}

export class CreateIdentityCardSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateIdentityCardFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateIdentityCardAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: IdentityCardPayload) {}
}

export class UpdateIdentityCardSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateIdentityCardFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteIdentityCardAction implements Action {
  readonly type = DELETE;

  constructor(public payload: IdentityCardPayload) {}
}

export class DeleteIdentityCardSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: DeleteResourceSuccessPayload) {}
}

export class DeleteIdentityCardFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) {}
}

export class ResetIdentityCardForm implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions =
  | LoadAllAction
  | LoadAllCompleteAction
  | LoadAction
  | SelectAction
  | CreateIdentityCardAction
  | CreateIdentityCardSuccessAction
  | CreateIdentityCardFailAction
  | UpdateIdentityCardAction
  | UpdateIdentityCardSuccessAction
  | UpdateIdentityCardFailAction
  | DeleteIdentityCardAction
  | DeleteIdentityCardSuccessAction
  | DeleteIdentityCardFailAction
  | ResetIdentityCardForm;
