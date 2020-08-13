import * as task from './customer-task.actions';
import { ProcessStep } from '../../../../services/customer/domain/process-step.model';

export interface State {
  processSteps: ProcessStep[];
}

const initialState: State = {
  processSteps: [],
};

export function reducer(state = initialState, action: task.Actions): State {
  switch (action.type) {
    case task.LOAD_ALL: {
      return initialState;
    }

    case task.LOAD_ALL_COMPLETE: {
      const processSteps = action.payload;

      return {
        processSteps,
      };
    }

    default: {
      return state;
    }
  }
}

export const getProcessSteps = (state: State) => state.processSteps;
