import { Action } from '@ngrx/store';
import { type } from '../../../store/util';
import { UserWithPassword } from '../../../services/identity/domain/user-with-password.model';
import { Error } from '../../../services/domain/error.model';
import {
  CreateResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../common/store/resource.reducer';
import { RoutePayload } from '../../common/store/route-payload';

export const LOAD = type('[User] Load');
export const SELECT = type('[User] Select');

export const CREATE = type('[User] Create');
export const CREATE_SUCCESS = type('[User] Create Success');
export const CREATE_FAIL = type('[User] Create Fail');

export const UPDATE = type('[User] Update');
export const UPDATE_SUCCESS = type('[User] Update Success');
export const UPDATE_FAIL = type('[User] Update Fail');

export const DELETE = type('[User] Delete');
export const DELETE_SUCCESS = type('[User] Delete Success');
export const DELETE_FAIL = type('[User] Delete Fail');

export const RESET_FORM = type('[User] Reset Form');

export interface UserCreatePayload extends RoutePayload {
  user: UserWithPassword;
}

export interface UserUpdatePayload extends RoutePayload {
  identifier: string;
  password?: string;
  role?: string;
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateUserAction implements Action {
  readonly type = CREATE;

  constructor(public payload: UserCreatePayload) {}
}

export class CreateUserSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateUserFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateUserAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: UserUpdatePayload) {}
}

export class UpdateUserSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateUserFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class ResetUserFormAction implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions =
  | LoadAction
  | SelectAction
  | CreateUserAction
  | CreateUserSuccessAction
  | CreateUserFailAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailAction
  | ResetUserFormAction;
