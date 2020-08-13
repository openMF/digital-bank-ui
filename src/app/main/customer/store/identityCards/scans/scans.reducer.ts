import { ResourceState } from '../../../../common/store/resource.reducer';
import { IdentificationCardScan } from '../../../../../services/customer/domain/identification-card-scan.model';
import { idsToHashWithCurrentTimestamp, resourcesToHash } from '../../../../common/store/reducer.helper';
import * as identityCardScans from './scans.actions';

export const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

export function reducer(state = initialState, action: identityCardScans.Actions): ResourceState {
  switch (action.type) {
    case identityCardScans.LOAD_ALL: {
      return initialState;
    }

    case identityCardScans.LOAD_ALL_COMPLETE: {
      const cardScans: IdentificationCardScan[] = action.payload;
      const ids = cardScans.map(scan => scan.identifier);
      const entities = resourcesToHash(cardScans);
      const loadedAt = idsToHashWithCurrentTimestamp(ids);

      return {
        ids: [...ids],
        entities,
        loadedAt,
        selectedId: state.selectedId,
      };
    }

    default: {
      return state;
    }
  }
}
