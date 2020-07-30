import { Action } from '@ngrx/store';
import { type } from '../../../store/util';
import { User } from '../../../services/identity/domain/user.model';
import { Error } from '../../../services/domain/error.model';
import {
  CreateResourceSuccessPayload,
  DeleteResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../common/store/resource.reducer';
import { RoutePayload } from '../../common/store/route-payload';
import { SearchResult } from '../../common/store/search.reducer';
import { FetchRequest } from '../../../services/domain/paging/fetch-request.model';

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

export const SEARCH = type('[User] Search');
export const SEARCH_COMPLETE = type('[User] Search Complete');

export interface UserRoutePayload extends RoutePayload {
  user: User;
}

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: FetchRequest) {}
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

export class CreateUserAction implements Action {
  readonly type = CREATE;

  constructor(public payload: UserRoutePayload) {}
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

  constructor(public payload: UserRoutePayload) {}
}

export class UpdateUserSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateUserFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteUserAction implements Action {
  readonly type = DELETE;

  constructor(public payload: UserRoutePayload) {}
}

export class DeleteUserSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: DeleteResourceSuccessPayload) {}
}

export class DeleteUserFailAction implements Action {
  readonly type = DELETE_FAIL;

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
  | DeleteUserAction
  | DeleteUserSuccessAction
  | DeleteUserFailAction
  | ResetUserFormAction
  | SearchAction
  | SearchCompleteAction;
