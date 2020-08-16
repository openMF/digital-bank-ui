import { ResourceState } from '../../../common/store/resource.reducer';
import * as tellers from '../teller/teller.actions';
import { Status, Teller } from '../../../../services/teller/domain/teller.model';
import { idsToHashWithCurrentTimestamp, resourcesToHash } from '../../../common/store/reducer.helper';
import { TellerManagementCommand } from '../../../../services/teller/domain/teller-management-command.model';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: tellers.Actions): ResourceState {
  switch (action.type) {
    case tellers.LOAD_TELLER: {
      return initialState;
    }

    case tellers.LOAD_TELLER_SUCCESS: {
      const teller: Teller[] = action.payload;

      const ids = teller.map(t => t.code);

      const entities = resourcesToHash(teller, 'code');

      const loadedAt = idsToHashWithCurrentTimestamp(ids);

      return {
        ids: [...ids],
        entities: entities,
        loadedAt: loadedAt,
        selectedId: state.selectedId,
      };
    }

    case tellers.EXECUTE_COMMAND_SUCCESS: {
      const payload = action.payload;
      const tellerCode = payload.tellerCode;
      const command: TellerManagementCommand = payload.command;
      const teller: Teller = state.entities[tellerCode];

      let tellerState: Status = null;
      let assignedEmployee = null;

      if (command.action === 'OPEN') {
        tellerState = 'OPEN';
        assignedEmployee = command.assignedEmployeeIdentifier;
      } else if (command.action === 'CLOSE') {
        tellerState = 'CLOSED';
      }

      const newTeller = Object.assign({}, teller, {
        state: tellerState,
        assignedEmployee,
      });

      return {
        ids: [...state.ids],
        entities: Object.assign({}, state.entities, {
          [teller.code]: newTeller,
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
