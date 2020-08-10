import * as productActions from '../store/product.actions';
import { ResourceState } from '../../common/store/resource.reducer';
import { ProductDefinitionCommand } from '../../../services/depositAccount/domain/definition/product-definition-command.model';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: productActions.Actions): ResourceState {
  switch (action.type) {
    case productActions.EXECUTE_COMMAND_SUCCESS: {
      const payload = action.payload;

      const definitionId = payload.definitionId;
      const command: ProductDefinitionCommand = payload.command;

      const definition = state.entities[definitionId];

      let active = false;

      if (command.action === 'ACTIVATE') {
        active = true;
      }

      return {
        ids: [...state.ids],
        entities: Object.assign({}, state.entities, {
          [definition.identifier]: { ...definition, active: active },
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
