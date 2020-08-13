import { type } from '../../../../../store/util';
import { IdentificationCardScan } from '../../../../../services/customer/domain/identification-card-scan.model';
import { Action } from '@ngrx/store';
import { CreateResourceSuccessPayload, DeleteResourceSuccessPayload } from '../../../../common/store/resource.reducer';
import { RoutePayload } from '../../../../common/store/route-payload';

export const LOAD_ALL = type('[Customer Identity Card Scan] Load All');
export const LOAD_ALL_COMPLETE = type('[Customer Identity Card Scan] Load All Complete');

export const CREATE = type('[Customer Identity Card Scan] Create');
export const CREATE_SUCCESS = type('[Customer Identity Card Scan] Create Success');
export const CREATE_FAIL = type('[Customer Identity Card Scan] Create Fail');

export const DELETE = type('[Customer Identity Card Scan] Delete');
export const DELETE_SUCCESS = type('[Customer Identity Card Scan] Delete Success');
export const DELETE_FAIL = type('[Customer Identity Card Scan] Delete Fail');

export const RESET_FORM = type('[Customer Identity Card Scan] Reset Form');

export interface LoadAllPayload {
  customerIdentifier: string;
  identificationCardNumber: string;
}

export interface IdentityCardScanPayload extends RoutePayload {
  customerIdentifier: string;
  identificationCardNumber: string;
  scan: IdentificationCardScan;
  file: File;
}

export interface DeleteIdentityCardScanPayload {
  customerIdentifier: string;
  identificationCardNumber: string;
  scan: IdentificationCardScan;
}

export class LoadAllAction implements Action {
  readonly type = LOAD_ALL;

  constructor(public payload: LoadAllPayload) {}
}

export class LoadAllCompleteAction implements Action {
  readonly type = LOAD_ALL_COMPLETE;

  constructor(public payload: IdentificationCardScan[]) {}
}

export class CreateIdentityCardScanAction implements Action {
  readonly type = CREATE;

  constructor(public payload: IdentityCardScanPayload) {}
}

export class CreateIdentityCardScanSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: CreateResourceSuccessPayload) {}
}

export class CreateIdentityCardScanFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) {}
}

export class DeleteIdentityCardScanAction implements Action {
  readonly type = DELETE;

  constructor(public payload: DeleteIdentityCardScanPayload) {}
}

export class DeleteIdentityCardScanSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: DeleteResourceSuccessPayload) {}
}

export class DeleteIdentityCardScanFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) {}
}

export class ResetIdentityCardScanForm implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions =
  | LoadAllAction
  | LoadAllCompleteAction
  | CreateIdentityCardScanAction
  | CreateIdentityCardScanSuccessAction
  | CreateIdentityCardScanFailAction
  | DeleteIdentityCardScanAction
  | DeleteIdentityCardScanSuccessAction
  | DeleteIdentityCardScanFailAction
  | ResetIdentityCardScanForm;
