import { type } from '../../../../store/util';
import { Action } from '@ngrx/store';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { RoutePayload } from '../../../common/store/route-payload';
import { Field } from '../../../../services/catalog/domain/field.model';

export const LOAD = type('[Customer Catalog] Load');

export const CREATE = type('[Customer Catalog] Create');
export const CREATE_SUCCESS = type('[Customer Catalog] Create Success');
export const CREATE_FAIL = type('[Customer Catalog] Create Fail');

export const DELETE = type('[Customer Catalog] Delete');
export const DELETE_SUCCESS = type('[Customer Catalog] Delete Success');
export const DELETE_FAIL = type('[Customer Catalog] Delete Fail');

export const SELECT_FIELD = type('[Customer Catalog] Select Field');

export const UPDATE_FIELD = type('[Customer Catalog] Update Field');
export const UPDATE_FIELD_SUCCESS = type('[Customer Catalog] Update Field Success');
export const UPDATE_FIELD_FAIL = type('[Customer Catalog] Update Field Fail');

export const DELETE_FIELD = type('[Customer Catalog] Delete Field');
export const DELETE_FIELD_SUCCESS = type('[Customer Catalog] Delete Field Success');
export const DELETE_FIELD_FAIL = type('[Customer Catalog] Delete Field Fail');

export interface CatalogRoutePayload extends RoutePayload {
  catalog: Catalog;
}

export interface FieldRoutePayload extends RoutePayload {
  catalogIdentifier: string;
  field: Field;
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Catalog) {}
}

export class CreateCatalogAction implements Action {
  readonly type = CREATE;

  constructor(public payload: CatalogRoutePayload) {}
}

export class CreateCatalogSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CatalogRoutePayload) {}
}

export class CreateCatalogFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteCatalogAction implements Action {
  readonly type = DELETE;

  constructor(public payload: CatalogRoutePayload) {}
}

export class DeleteCatalogSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: CatalogRoutePayload) {}
}

export class DeleteCatalogFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) {}
}

export class SelectFieldAction implements Action {
  readonly type = SELECT_FIELD;

  constructor(public payload: string) {}
}

export class UpdateFieldAction implements Action {
  readonly type = UPDATE_FIELD;

  constructor(public payload: FieldRoutePayload) {}
}

export class UpdateFieldSuccessAction implements Action {
  readonly type = UPDATE_FIELD_SUCCESS;

  constructor(public payload: FieldRoutePayload) {}
}

export class UpdateFieldFailAction implements Action {
  readonly type = UPDATE_FIELD_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteFieldAction implements Action {
  readonly type = DELETE_FIELD;

  constructor(public payload: FieldRoutePayload) {}
}

export class DeleteFieldSuccessAction implements Action {
  readonly type = DELETE_FIELD_SUCCESS;

  constructor(public payload: FieldRoutePayload) {}
}

export class DeleteFieldFailAction implements Action {
  readonly type = DELETE_FIELD_FAIL;

  constructor(public payload: Error) {}
}

export type Actions =
  | LoadAction
  | CreateCatalogAction
  | CreateCatalogSuccessAction
  | CreateCatalogFailAction
  | DeleteCatalogAction
  | DeleteCatalogSuccessAction
  | DeleteCatalogFailAction
  | SelectFieldAction
  | UpdateFieldAction
  | UpdateFieldSuccessAction
  | UpdateFieldFailAction
  | DeleteFieldAction
  | DeleteFieldSuccessAction
  | DeleteFieldFailAction;
