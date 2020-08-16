import { Action } from '@ngrx/store';
import { type } from '../../../store/util';
import { Office } from '../../../services/office/domain/office.model';
import { Error } from '../../../services/domain/error.model';
import { RoutePayload } from '../../common/store/route-payload';
import {
  CreateResourceSuccessPayload,
  DeleteResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../common/store/resource.reducer';

export const LOAD = type('[Office] Load');
export const SELECT = type('[Office] Select');

export const CREATE = type('[Office] Create');
export const CREATE_BRANCH = type('[Office] Create Branch');
export const CREATE_SUCCESS = type('[Office] Create Success');
export const CREATE_FAIL = type('[Office] Create Fail');

export const UPDATE = type('[Office] Update');
export const UPDATE_SUCCESS = type('[Office] Update Success');
export const UPDATE_FAIL = type('[Office] Update Fail');

export const DELETE = type('[Office] Delete');
export const DELETE_SUCCESS = type('[Office] Delete Success');
export const DELETE_FAIL = type('[Office] Delete Fail');

export const RESET_FORM = type('[Office] Reset Form');

export interface OfficeRoutePayload extends RoutePayload {
  office: Office;
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateOfficeAction implements Action {
  readonly type = CREATE;

  constructor(public payload: OfficeRoutePayload) {}
}

export class CreateBranchOfficeAction implements Action {
  readonly type = CREATE_BRANCH;

  constructor(public payload: OfficeRoutePayload) {}
}

export class CreateOfficeSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateOfficeFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateOfficeAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: OfficeRoutePayload) {}
}

export class UpdateOfficeSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateOfficeFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteOfficeAction implements Action {
  readonly type = DELETE;

  constructor(public payload: OfficeRoutePayload) {}
}

export class DeleteOfficeSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: DeleteResourceSuccessPayload) {}
}

export class DeleteOfficeFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) {}
}

export class ResetOfficeFormAction implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions =
  | LoadAction
  | SelectAction
  | CreateOfficeAction
  | CreateBranchOfficeAction
  | CreateOfficeSuccessAction
  | CreateOfficeFailAction
  | UpdateOfficeAction
  | UpdateOfficeSuccessAction
  | UpdateOfficeFailAction
  | DeleteOfficeAction
  | DeleteOfficeSuccessAction
  | DeleteOfficeFailAction
  | ResetOfficeFormAction;
