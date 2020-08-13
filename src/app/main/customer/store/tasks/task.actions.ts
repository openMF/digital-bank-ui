import { type } from '../../../../store/util';
import { Action } from '@ngrx/store';
import { TaskDefinition } from '../../../../services/customer/domain/task-definition.model';
import {
  CreateResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../../common/store/resource.reducer';
import { RoutePayload } from '../../../common/store/route-payload';

export const LOAD_ALL = type('[Task] Load All');
export const LOAD_ALL_COMPLETE = type('[Task] Load All Complete');

export const LOAD = type('[Task] Load');
export const SELECT = type('[Task] Select');

export const CREATE = type('[Task] Create');
export const CREATE_SUCCESS = type('[Task] Create Success');
export const CREATE_FAIL = type('[Task] Create Fail');

export const UPDATE = type('[Task] Update');
export const UPDATE_SUCCESS = type('[Task] Update Success');
export const UPDATE_FAIL = type('[Task] Update Fail');

export const DELETE = type('[Task] Delete');
export const DELETE_SUCCESS = type('[Task] Delete Success');
export const DELETE_FAIL = type('[Task] Delete Fail');

export const RESET_FORM = type('[Task] Reset Form');

export interface TaskRoutePayload extends RoutePayload {
  task: TaskDefinition;
}

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload: string) {}
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;

  constructor(public payload: TaskDefinition[]) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateTaskAction implements Action {
  readonly type = CREATE;

  constructor(public payload: TaskRoutePayload) {}
}

export class CreateTaskSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateTaskFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateTaskAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: TaskRoutePayload) {}
}

export class UpdateTaskSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateTaskFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteTaskAction implements Action {
  readonly type = DELETE;

  constructor(public payload: TaskRoutePayload) {}
}

export class DeleteTaskSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class DeleteTaskFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) {}
}

export class ResetTaskFormAction implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions =
  | LoadAllAction
  | LoadAllCompleteAction
  | LoadAction
  | SelectAction
  | CreateTaskAction
  | CreateTaskSuccessAction
  | CreateTaskFailAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | UpdateTaskFailAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskFailAction
  | ResetTaskFormAction;
