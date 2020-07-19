// import * as fromRoot from '../../../store';
import { ActionReducer } from '@ngrx/store';
import { createReducer } from '../../../store/index';
import { createSelector } from 'reselect';
import { createResourceReducer, getResourceLoadedAt, getResourceSelected, ResourceState } from '../../../common/store/resource.reducer';
import { createFormReducer, FormState, getFormError } from '../../../common/store/form.reducer';

export const rolesFeatureKey = 'roles';

// export interface State extends fromRoot.State {
//   roles: ResourceState;
//   roleForm: FormState;
// }

export interface State {
  roles: ResourceState;
  roleForm: FormState;
}

const reducers = {
  roles: createResourceReducer('Role'),
  roleForm: createFormReducer('Role'),
};

export const roleModuleReducer: ActionReducer<State> = createReducer(reducers);

export const getRolesState = (state: State) => state.roles;

export const getRoleFormState = (state: State) => state.roleForm;
export const getRoleFormError = createSelector(getRoleFormState, getFormError);

export const getRolesLoadedAt = createSelector(getRolesState, getResourceLoadedAt);
export const getSelectedRole = createSelector(getRolesState, getResourceSelected);
