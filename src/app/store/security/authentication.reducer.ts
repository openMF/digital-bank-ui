import * as security from './security.actions';
import { LoginSuccessPayload } from './security.actions';
import { Authentication } from '../../services/identity/domain/authentication.model';

export interface State {
  username: string;
  tenant: string;
  password: string;
  authentication: Authentication;
  loading: boolean;
  error: Error;
  passwordError: Error;
}

const initialState: State = {
  username: null,
  tenant: null,
  password: null,
  authentication: null,
  loading: false,
  error: null,
  passwordError: null,
};

export function reducer(state = initialState, action: security.Actions): State {
  switch (action.type) {
    case security.LOGIN: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case security.LOGIN_SUCCESS: {
      const payload: LoginSuccessPayload = action.payload;
      return Object.assign({}, state, {
        loading: false,
        authentication: payload.authentication,
        username: payload.username,
        tenant: payload.tenant,
        password: payload.password,
      });
    }

    case security.REFRESH_ACCESS_TOKEN_SUCCESS: {
      const authentication = action.payload;
      return Object.assign({}, state, {
        authentication,
      });
    }

    case security.CHANGE_PASSWORD_FAIL: {
      const error = action.payload;
      return Object.assign({}, state, {
        passwordError: error,
      });
    }

    case security.LOGIN_FAIL: {
      const error = action.payload;
      return Object.assign({}, state, {
        loading: false,
        error,
      });
    }

    case security.LOGOUT_SUCCESS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getAuthentication = (state: State) => state.authentication;

export const getTenant = (state: State) => state.tenant;

export const getUsername = (state: State) => state.username;

export const getPassword = (state: State) => state.password;

export const getError = (state: State) => state.error;

export const getPasswordError = (state: State) => state.passwordError;

export const getLoading = (state: State) => state.loading;
