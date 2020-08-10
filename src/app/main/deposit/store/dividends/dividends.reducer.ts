import { DividendDistribution } from '../../../../services/depositAccount/domain/definition/dividend-distribution.model';
import * as dividend from './dividend.actions';

export interface State {
  entities: DividendDistribution[];
}

export const initialState: State = {
  entities: [],
};

export function reducer(state = initialState, action: dividend.Actions): State {
  switch (action.type) {
    case dividend.LOAD_ALL: {
      return initialState;
    }

    case dividend.LOAD_ALL_COMPLETE: {
      const entities: DividendDistribution[] = action.payload;

      return {
        entities,
      };
    }

    case dividend.CREATE_SUCCESS: {
      const entity: DividendDistribution = action.payload.dividendDistribution;

      return {
        entities: [...state.entities, entity],
      };
    }

    default: {
      return state;
    }
  }
}

export const getDividends = (state: State) => state.entities;
