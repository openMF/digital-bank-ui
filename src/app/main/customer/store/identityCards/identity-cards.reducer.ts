import * as identityCards from './identity-cards.actions';
import { ResourceState } from '../../../common/store/resource.reducer';
import { IdentificationCard } from '../../../../services/customer/domain/identification-card.model';
import { idsToHashWithCurrentTimestamp, resourcesToHash } from '../../../common/store/reducer.helper';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: identityCards.Actions): ResourceState {
  switch (action.type) {
    case identityCards.LOAD_ALL: {
      return initialState;
    }

    case identityCards.LOAD_ALL_COMPLETE: {
      const identificationCards: IdentificationCard[] = action.payload;

      const ids = identificationCards.map(identificationCard => identificationCard.number);

      const entities = resourcesToHash(identificationCards, 'number');

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
