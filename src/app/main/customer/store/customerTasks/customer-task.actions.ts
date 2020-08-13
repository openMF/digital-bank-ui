import { Action } from '@ngrx/store';
import { type } from '../../../../store/util';
import { Error } from '../../../../services/domain/error.model';
import { Command } from '../../../../services/customer/domain/command.model';
import { RoutePayload } from '../../../common/store/route-payload';
import { ProcessStep } from '../../../../services/customer/domain/process-step.model';

export const LOAD_ALL = type('[Customer Task] Load All Process Steps');
export const LOAD_ALL_COMPLETE = type('[Customer Task] Load All Process Steps Complete');

export const EXECUTE_TASK = type('[Customer Task] Execute');
export const EXECUTE_TASK_SUCCESS = type('[Customer Task] Success');
export const EXECUTE_TASK_FAIL = type('[Customer Task] Fail');

export const EXECUTE_COMMAND = type('[Customer Command] Execute');
export const EXECUTE_COMMAND_SUCCESS = type('[Customer Command] Success');
export const EXECUTE_COMMAND_FAIL = type('[Customer Command] Fail');

export interface ExecuteTaskPayload extends RoutePayload {
  customerId: string;
  taskId: string;
}

export interface ExecuteCommandPayload {
  customerId: string;
  command: Command;
}

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload: string) {}
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;

  constructor(public payload: ProcessStep[]) {}
}

export class ExecuteTaskAction implements Action {
  readonly type = EXECUTE_TASK;

  constructor(public payload: ExecuteTaskPayload) {}
}

export class ExecuteTaskSuccessAction implements Action {
  readonly type = EXECUTE_TASK_SUCCESS;

  constructor(public payload: ExecuteTaskPayload) {}
}

export class ExecuteTaskFailAction implements Action {
  readonly type = EXECUTE_TASK_FAIL;

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
  | LoadAllAction
  | LoadAllCompleteAction
  | ExecuteTaskAction
  | ExecuteTaskSuccessAction
  | ExecuteTaskFailAction
  | ExecuteCommandAction
  | ExecuteCommandSuccessAction
  | ExecuteCommandFailAction;
