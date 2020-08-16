import { type } from '../../../../store/util';
import { Teller } from '../../../../services/teller/domain/teller.model';
import { Action } from '@ngrx/store';
import {
  CreateResourceSuccessPayload,
  LoadResourcePayload,
  SelectResourcePayload,
  UpdateResourceSuccessPayload,
} from '../../../common/store/resource.reducer';
import { RoutePayload } from '../../../common/store/route-payload';
import { TellerManagementCommand } from '../../../../services/teller/domain/teller-management-command.model';

export const LOAD_TELLER = type('[Office Teller] Load All ');
export const LOAD_TELLER_SUCCESS = type('[Office Teller] Load All Success');

export const LOAD = type('[Office Teller] Load');
export const SELECT = type('[Office Teller] Select');
export const CREATE_TELLER = type('[Office Teller] Create');
export const CREATE_TELLER_SUCCESS = type('[Office Teller] Create Success');
export const CREATE_TELLER_FAIL = type('[Office Teller] Create Fail');

export const UPDATE_TELLER = type('[Office Teller] Update');
export const UPDATE_TELLER_SUCCESS = type('[Office Teller] Update Success');
export const UPDATE_TELLER_FAIL = type('[Office Teller] Update Fail');

export const RESET_FORM = type('[Office Teller] Reset Form');

export const EXECUTE_COMMAND = type('[Office Teller] Execute Command');
export const EXECUTE_COMMAND_SUCCESS = type('[Office Teller] Execute Command Success');
export const EXECUTE_COMMAND_FAIL = type('[Office Teller] Execute Command Fail');

export interface LoadTellerSuccessPayload {
  officeId: string;
  teller: Teller[];
}

export interface ExecuteCommandPayload extends RoutePayload {
  officeId: string;
  tellerCode: string;
  command: TellerManagementCommand;
}

export interface ExecuteCommandFailPayload {
  command: TellerManagementCommand;
  error: Error;
}

export interface TellerPayload extends RoutePayload {
  officeId: string;
  teller: Teller;
}

export class LoadTellerAction implements Action {
  readonly type = LOAD_TELLER;

  constructor(public payload: string) {}
}

export class LoadTellerSuccessAction implements Action {
  readonly type = LOAD_TELLER_SUCCESS;

  constructor(public payload: Teller[]) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: LoadResourcePayload) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: SelectResourcePayload) {}
}

export class CreateTellerAction implements Action {
  readonly type = CREATE_TELLER;

  constructor(public payload: TellerPayload) {}
}

export class CreateTellerSuccessAction implements Action {
  readonly type = CREATE_TELLER_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateTellerFailAction implements Action {
  readonly type = CREATE_TELLER_FAIL;

  constructor(public payload: Error) {}
}

export class UpdateTellerAction implements Action {
  readonly type = UPDATE_TELLER;

  constructor(public payload: TellerPayload) {}
}

export class UpdateTellerSuccessAction implements Action {
  readonly type = UPDATE_TELLER_SUCCESS;

  constructor(public payload: UpdateResourceSuccessPayload) {}
}

export class UpdateTellerFailAction implements Action {
  readonly type = UPDATE_TELLER_FAIL;

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

  constructor(public payload: ExecuteCommandFailPayload) {}
}

export type Actions =
  | LoadTellerAction
  | LoadTellerSuccessAction
  | CreateTellerAction
  | CreateTellerSuccessAction
  | CreateTellerFailAction
  | UpdateTellerAction
  | UpdateTellerSuccessAction
  | UpdateTellerFailAction
  | ExecuteCommandAction
  | ExecuteCommandSuccessAction
  | ExecuteCommandFailAction;
