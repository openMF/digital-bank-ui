import * as denominations from './denomination.actions';
import { DenominationPayload } from './denomination.actions';
import { TellerDenomination } from '../../../../../services/teller/domain/teller-denomination.model';

export interface State {
  entities: TellerDenomination[];
}

export const initialState: State = {
  entities: [],
};

export function reducer(state = initialState, action: denominations.Actions): State {
  switch (action.type) {
    case denominations.LOAD_DENOMINATION: {
      return initialState;
    }

    case denominations.LOAD_DENOMINATION_SUCCESS: {
      const denomination: TellerDenomination[] = action.payload;

      return {
        entities: denomination,
      };
    }

    case denominations.CREATE_DENOMINATION_SUCCESS: {
      const payload: DenominationPayload = action.payload;

      return {
        entities: state.entities.concat(payload.denomination),
      };
    }

    default: {
      return state;
    }
  }
}

export const getDenominationEntities = (state: State) => state.entities;
