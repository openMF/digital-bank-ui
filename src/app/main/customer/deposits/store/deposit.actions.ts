import { type } from '../../../../store/util';
import { FetchRequest } from '../../../../services/domain/paging/fetch-request.model';
import { RoutePayload } from '../../../common/store/route-payload';
import { ProductInstance } from '../../../../services/depositAccount/domain/instance/product-instance.model';
import {
  CreateResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../../common/store/resource.reducer';
import { Action } from '@ngrx/store';
import { SearchResult } from '../../../common/store/search.reducer';
import { IssuingCount } from '../../../../services/cheque/domain/issuing-count.model';

export const SEARCH = type('[Deposit] Search');
export const SEARCH_COMPLETE = type('[Deposit] Search Complete');

export const LOAD = type('[Deposit] Load');
export const SELECT = type('[Deposit] Select');

export const CREATE = type('[Deposit] Create');
export const CREATE_SUCCESS = type('[Deposit] Create Success');
export const CREATE_FAIL = type('[Deposit] Create Fail');

export const UPDATE = type('[Deposit] Update');
export const UPDATE_SUCCESS = type('[Deposit] Update Success');
export const UPDATE_FAIL = type('[Deposit] Update Fail');

export const ISSUE_CHEQUES = type('[Deposit] Issue Cheques');
export const ISSUE_CHEQUES_SUCCESS = type('[Deposit] Issue Cheques Success');
export const ISSUE_CHEQUES_FAIL = type('[Deposit] Issue Cheques Fail');

export interface SearchProductInstancePayload {
  customerId: string;
  fetchRequest: FetchRequest;
}

export interface DepositRoutePayload extends RoutePayload {
  productInstance: ProductInstance;
}

export interface IssueChequePayload extends RoutePayload {
  issuingCount: IssuingCount;
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: SearchProductInstancePayload) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: SearchResult) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateProductInstanceAction implements Action {
  readonly type = CREATE;

  constructor(public payload: DepositRoutePayload) {}
}

export class CreateProductInstanceSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateProductInstanceFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateProductInstanceAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: DepositRoutePayload) {}
}

export class UpdateProductInstanceSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateProductInstanceFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class IssueChequesAction implements Action {
  readonly type = ISSUE_CHEQUES;

  constructor(public payload: IssueChequePayload) {}
}

export class IssueChequesSuccessAction implements Action {
  readonly type = ISSUE_CHEQUES_SUCCESS;

  constructor(public payload: IssueChequePayload) {}
}

export class IssueChequesFailAction implements Action {
  readonly type = ISSUE_CHEQUES_FAIL;

  constructor(public payload: Error) {}
}

export type Actions =
  | SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction
  | CreateProductInstanceAction
  | CreateProductInstanceSuccessAction
  | CreateProductInstanceFailAction
  | UpdateProductInstanceAction
  | UpdateProductInstanceSuccessAction
  | UpdateProductInstanceFailAction
  | IssueChequesAction
  | IssueChequesSuccessAction
  | IssueChequesFailAction;
