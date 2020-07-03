import * as security from './security.actions';
import { FimsPermission } from '../../services/security/authz/fims-permission.model';

export interface State {
  permissions: FimsPermission[];
  loading: boolean;
}

const initialState: State = {
  permissions: [],
  loading: false,
};

export function reducer(state = initialState, action: security.Actions): State {
  switch (action.type) {
    case security.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case security.PERMISSIONS_UPDATE_SUCCESS: {
      const permissions = action.payload;
      return Object.assign({}, state, {
        loading: false,
        permissions,
      });
    }

    case security.PERMISSIONS_UPDATE_FAIL:
    case security.LOGOUT_SUCCESS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getPermissions = (state: State) => state.permissions;

export const getLoading = (state: State) => state.loading;
