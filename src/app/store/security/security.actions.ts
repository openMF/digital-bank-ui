
import {Action} from '@ngrx/store';
import {type} from '../util';
import {Authentication} from '../../services/identity/domain/authentication.model';
import {FimsPermission} from '../../services/security/authz/fims-permission.model';

export const LOGIN = type('[Security] Login');
export const LOGIN_SUCCESS = type('[Security] Login Success');
export const LOGIN_FAIL = type('[Security] Login Fail');
export const LOGOUT = type('[Security] Logout');
export const LOGOUT_SUCCESS = type('[Security] Logout Success');

export const REFRESH_TOKEN_START_TIMER = type('[Security] Refresh Token Start Timer');

export const REFRESH_ACCESS_TOKEN_START_TIMER = type('[Security] Refresh Access Token Start Timer');
export const REFRESH_ACCESS_TOKEN = type('[Security] Refresh Access Token');
export const REFRESH_ACCESS_TOKEN_SUCCESS = type('[Security] Refresh Access Token Success');
export const REFRESH_ACCESS_TOKEN_FAIL = type('[Security] Refresh Access Token Fail');

export const PERMISSIONS_UPDATE_SUCCESS = type('[Security] Permission Update Success');
export const PERMISSIONS_UPDATE_FAIL = type('[Security] Permission Update Fail');

export const CHANGE_PASSWORD = type('[Security] Change Password');
export const CHANGE_PASSWORD_SUCCESS = type('[Security] Change Password Success');
export const CHANGE_PASSWORD_FAIL = type('[Security] Change Password Fail');

export interface LoginPayload {
  username: string;
  password: string;
  tenant: string;
}

export interface LoginSuccessPayload {
  username: string;
  tenant: string;
  password: string;
  authentication: Authentication;
}

export interface ChangePasswordPayload {
  username: string;
  password: string;
}

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginPayload) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: LoginSuccessPayload) { }
}

export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: Error) { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() { }
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor() { }
}

export class RefreshTokenStartTimerAction implements Action {
  readonly type = REFRESH_TOKEN_START_TIMER;

  constructor(public payload: Date) { }
}

export class RefreshAccessTokenStartTimerAction implements Action {
  readonly type = REFRESH_ACCESS_TOKEN_START_TIMER;

  constructor(public payload: Date) { }
}

export class RefreshAccessTokenAction implements Action {
  readonly type = REFRESH_ACCESS_TOKEN;

  constructor() { }
}

export class RefreshAccessTokenSuccessAction implements Action {
  readonly type = REFRESH_ACCESS_TOKEN_SUCCESS;

  constructor(public payload: Authentication) { }
}

export class RefreshAccessTokenFailAction implements Action {
  readonly type = REFRESH_ACCESS_TOKEN_FAIL;

  constructor(public payload: Error) { }
}

export class PermissionUpdateSuccessAction implements Action {
  readonly type = PERMISSIONS_UPDATE_SUCCESS;

  constructor(public payload: FimsPermission[]) { }
}

export class PermissionUpdateFailAction implements Action {
  readonly type = PERMISSIONS_UPDATE_FAIL;

  constructor(public payload: Error) { }
}

export class ChangePasswordAction implements Action {
  readonly type = CHANGE_PASSWORD;

  constructor(public payload: ChangePasswordPayload) { }
}

export class ChangePasswordSuccessAction implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;

  constructor() { }
}

export class ChangePasswordFailAction implements Action {
  readonly type = CHANGE_PASSWORD_FAIL;

  constructor(public payload: Error) { }
}

export type Actions
  = LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | LogoutSuccessAction
  | RefreshTokenStartTimerAction
  | RefreshAccessTokenStartTimerAction
  | RefreshAccessTokenAction
  | RefreshAccessTokenSuccessAction
  | RefreshAccessTokenFailAction
  | PermissionUpdateSuccessAction
  | PermissionUpdateFailAction
  | ChangePasswordAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailAction;
