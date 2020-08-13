import { ResourceState } from '../../../common/store/resource.reducer';
import { TaskDefinition } from '../../../../services/customer/domain/task-definition.model';
import { idsToHashWithCurrentTimestamp, resourcesToHash } from '../../../common/store/reducer.helper';
import * as task from './task.actions';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: task.Actions): ResourceState {
  switch (action.type) {
    case task.LOAD_ALL: {
      return initialState;
    }

    case task.LOAD_ALL_COMPLETE: {
      const taskDefinitions: TaskDefinition[] = action.payload;

      const ids = taskDefinitions.map(tasks => tasks.identifier);

      const entities = resourcesToHash(taskDefinitions);

      const loadedAt = idsToHashWithCurrentTimestamp(ids);

      return {
        ids: [...ids],
        entities: entities,
        loadedAt: loadedAt,
        selectedId: state.selectedId,
      };
    }

    default: {
      return state;
    }
  }
}
