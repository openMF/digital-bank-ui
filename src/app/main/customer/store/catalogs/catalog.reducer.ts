import * as catalogActions from './catalog.actions';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { Field } from '../../../../services/catalog/domain/field.model';
import { createSelector } from '@ngrx/store';

export interface State {
  catalog: Catalog;
  loadedAt: number;
  selectedFieldIdentifier: string;
}

const initialState: State = {
  catalog: null,
  loadedAt: null,
  selectedFieldIdentifier: null,
};

export function reducer(state: State = initialState, action: catalogActions.Actions): State {
  switch (action.type) {
    case catalogActions.LOAD: {
      const catalog: Catalog = action.payload;

      return Object.assign({}, state, {
        catalog,
        loadedAt: Date.now(),
      });
    }

    case catalogActions.CREATE_SUCCESS: {
      const catalog: Catalog = action.payload.catalog;

      return Object.assign({}, state, {
        catalog,
        loadedAt: state.loadedAt,
      });
    }

    case catalogActions.DELETE_SUCCESS: {
      return initialState;
    }

    case catalogActions.SELECT_FIELD: {
      return Object.assign({}, state, {
        selectedFieldIdentifier: action.payload,
      });
    }

    case catalogActions.UPDATE_FIELD_SUCCESS: {
      const payload = action.payload;
      const updatedField: Field = payload.field;

      const catalog = Object.assign({}, state.catalog, {
        fields: state.catalog.fields.map(field => (field.identifier === updatedField.identifier ? updatedField : field)),
      });

      return Object.assign({}, state, {
        catalog,
        loadedAt: state.loadedAt,
      });
    }

    case catalogActions.DELETE_FIELD_SUCCESS: {
      const payload = action.payload;
      const deletedField: Field = payload.field;

      const catalog = Object.assign({}, state.catalog, {
        fields: state.catalog.fields.filter(field => field.identifier !== deletedField.identifier),
      });

      return Object.assign({}, state, {
        catalog,
        loadedAt: state.loadedAt,
      });
    }

    default: {
      return state;
    }
  }
}

export const getCustomerCatalog = (state: State) => state.catalog;
export const getCustomerCatalogLoadedAt = (state: State) => state.loadedAt;
export const getSelectedFieldId = (state: State) => state.selectedFieldIdentifier;
export const getSelectedField = createSelector(getCustomerCatalog, getSelectedFieldId, (catalog, selectedId) => {
  return catalog.fields.find(field => field.identifier === selectedId);
});
