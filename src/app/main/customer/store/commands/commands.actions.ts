import { type } from '../../../../store/util';
import { Action } from '@ngrx/store';
import { Command } from '../../../../services/customer/domain/command.model';

export const LOAD_ALL = type('[Customer Command] Load All');
export const LOAD_ALL_COMPLETE = type('[Customer Command] Load All Complete');

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload: string) {}
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;

  constructor(public payload: Command[]) {}
}

export type Actions = LoadAllAction | LoadAllCompleteAction;
