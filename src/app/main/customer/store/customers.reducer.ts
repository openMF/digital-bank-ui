import * as customerActions from './customer.actions';
import * as customerTasks from './customerTasks/customer-task.actions';
import { Command } from '../../../services/customer/domain/command.model';
import { CustomerState } from '../../../services/customer/domain/customer-state.model';
import { ResourceState } from '../../common/store/resource.reducer';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: customerActions.Actions | customerTasks.Actions): ResourceState {
  switch (action.type) {
    case customerTasks.EXECUTE_COMMAND_SUCCESS: {
      const payload = action.payload;

      const customerId = payload.customerId;
      const command: Command = payload.command;

      const customer = state.entities[customerId];

      let customerState: CustomerState = null;

      if (command.action === 'ACTIVATE') {
        customerState = 'ACTIVE';
      } else if (command.action === 'LOCK') {
        customerState = 'LOCKED';
      } else if (command.action === 'UNLOCK') {
        customerState = 'ACTIVE';
      } else if (command.action === 'CLOSE') {
        customerState = 'CLOSED';
      } else if (command.action === 'REOPEN') {
        customerState = 'ACTIVE';
      }

      customer.currentState = customerState;

      return {
        ids: [...state.ids],
        entities: Object.assign({}, state.entities, {
          [customer.identifier]: customer,
        }),
        loadedAt: state.loadedAt,
        selectedId: state.selectedId,
      };
    }

    default: {
      return state;
    }
  }
}
