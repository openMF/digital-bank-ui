
import {Action} from '@ngrx/store';

// Actions
export interface LoadAllAction extends Action {
  payload?: any;
}

export interface LoadAllCompleteAction<T> extends Action {
  payload?: LoadAllCompleteActionPayload<T>;
}

export interface LoadAction<T> extends Action {
  payload: LoadActionPayload<T>;
}

export interface SelectAction extends Action {
  payload: SelectActionPayload;
}

export interface ResourceAction<T> extends Action {
  payload: ResourceActionPayload<T>;
}

interface DataPayload {
  data?: any;
}

// Payload
export interface LoadAllCompleteActionPayload<T> extends DataPayload {
  resources: T[];
}

export interface LoadActionPayload<T> extends DataPayload {
  resource: T;
}

export interface SelectActionPayload extends DataPayload {
  identifier: string;
}

export interface ResourceActionPayload<T> extends DataPayload {
  resource: T;
}

export interface ResourceSuccessActionPayload<T> extends DataPayload {
  resource: T;
}

export interface ResourceFailActionPayload<T> extends DataPayload {
  resource: T;
  error: Error;
}

export interface ResourceActions<T> {
  LOAD_ALL: string;
  LOAD_ALL_COMPLETE: string;
  LOAD: string;
  SELECT: string;
  CREATE: string;
  CREATE_SUCCESS: string;
  CREATE_FAIL: string;
  UPDATE: string;
  UPDATE_SUCCESS: string;
  UPDATE_FAIL: string;
  DELETE: string;
  DELETE_SUCCESS: string;
  DELETE_FAIL: string;

  loadAllAction(payload?: any): LoadAllAction;
  loadAllCompleteAction(payload?: LoadAllCompleteActionPayload<T>): LoadAllCompleteAction<T>;
  loadAction(payload: LoadActionPayload<T>): LoadAction<T>;
  selectAction(payload: SelectActionPayload): SelectAction;
  createAction(payload: ResourceActionPayload<T>): ResourceAction<T>;
  createSuccessAction(payload: ResourceSuccessActionPayload<T>): ResourceAction<T>;
  createFailAction(payload: ResourceFailActionPayload<T>): ResourceAction<T>;
  updateAction(payload: ResourceActionPayload<T>): ResourceAction<T>;
  updateSuccessAction(payload: ResourceSuccessActionPayload<T>): ResourceAction<T>;
  updateFailAction(payload: ResourceFailActionPayload<T>): ResourceAction<T>;
  deleteAction(payload: ResourceActionPayload<T>): ResourceAction<T>;
  deleteSuccessAction(payload: ResourceSuccessActionPayload<T>): ResourceAction<T>;
  deleteFailAction(payload: ResourceFailActionPayload<T>): ResourceAction<T>;
}
