import { type } from '../../../store/util';
import { RoutePayload } from '../../common/store/route-payload';
import { ProductDefinition } from '../../../services/depositAccount/domain/definition/product-definition.model';
import { Action } from '@ngrx/store';
import { SearchResult } from '../../common/store/search.reducer';
import {
  CreateResourceSuccessPayload,
  DeleteResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../common/store/resource.reducer';
import { ProductDefinitionCommand } from '../../../services/depositAccount/domain/definition/product-definition-command.model';

export const SEARCH = type('[Deposit Product Definition] Search');
export const SEARCH_COMPLETE = type('[Deposit Product Definition] Search Complete');

export const LOAD = type('[Deposit Product Definition] Load');
export const SELECT = type('[Deposit Product Definition] Select');

export const CREATE = type('[Deposit Product Definition] Create');
export const CREATE_SUCCESS = type('[Deposit Product Definition] Create Success');
export const CREATE_FAIL = type('[Deposit Product Definition] Create Fail');

export const UPDATE = type('[Deposit Product Definition] Update');
export const UPDATE_SUCCESS = type('[Deposit Product Definition] Update Success');
export const UPDATE_FAIL = type('[Deposit Product Definition] Update Fail');

export const DELETE = type('[Deposit Product Definition] Delete');
export const DELETE_SUCCESS = type('[Deposit Product Definition] Delete Success');
export const DELETE_FAIL = type('[Deposit Product Definition] Delete Fail');

export const RESET_FORM = type('[Deposit Product Definition] Reset Form');

export const EXECUTE_COMMAND = type('[Deposit Product Definition] Execute Command');
export const EXECUTE_COMMAND_SUCCESS = type('[Deposit Product Definition] Execute Command Success');
export const EXECUTE_COMMAND_FAIL = type('[Deposit Product Definition] Execute Command Fail');

export interface ProductDefinitionRoutePayload extends RoutePayload {
  productDefinition: ProductDefinition;
}

export interface ExecuteCommandPayload extends RoutePayload {
  definitionId: string;
  command: ProductDefinitionCommand;
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor() {}
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

export class CreateProductDefinitionAction implements Action {
  readonly type = CREATE;

  constructor(public payload: ProductDefinitionRoutePayload) {}
}

export class CreateProductDefinitionSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateProductDefinitionFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateProductDefinitionAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: ProductDefinitionRoutePayload) {}
}

export class UpdateProductDefinitionSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateProductDefinitionFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteProductDefinitionAction implements Action {
  readonly type = DELETE;

  constructor(public payload: ProductDefinitionRoutePayload) {}
}

export class DeleteProductDefinitionSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: DeleteResourceSuccessPayload) {}
}

export class DeleteProductDefinitionFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) {}
}

export class ExecuteCommandAction implements Action {
  readonly type = EXECUTE_COMMAND;

  constructor(public payload: ExecuteCommandPayload) {}
}

export class ExecuteCommandSuccessAction implements Action {
  readonly type = EXECUTE_COMMAND_SUCCESS;

  constructor(public payload: ExecuteCommandPayload) {}
}

export class ExecuteCommandFailAction implements Action {
  readonly type = EXECUTE_COMMAND_FAIL;

  constructor(public payload: Error) {}
}

export type Actions =
  | SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction
  | CreateProductDefinitionAction
  | CreateProductDefinitionSuccessAction
  | CreateProductDefinitionFailAction
  | UpdateProductDefinitionAction
  | UpdateProductDefinitionSuccessAction
  | UpdateProductDefinitionFailAction
  | DeleteProductDefinitionAction
  | DeleteProductDefinitionSuccessAction
  | DeleteProductDefinitionFailAction
  | ExecuteCommandAction
  | ExecuteCommandSuccessAction
  | ExecuteCommandFailAction;
