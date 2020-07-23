import { Action, ActionReducer, createSelector } from '@ngrx/store';
import { FetchRequest } from '../../../services/domain/paging/fetch-request.model';

export function emptySearchResult(): SearchResult {
  return {
    elements: [],
    totalElements: 0,
    totalPages: 0,
  };
}

export interface SearchPayload {
  fetchRequest: FetchRequest;
}

export interface SearchResult {
  elements: any[];
  totalElements: number;
  totalPages: number;
}

export interface SearchState {
  entities: any[];
  totalPages: number;
  totalElements: number;
  loading: boolean;
  fetchRequest: FetchRequest;
}

const initialState: SearchState = {
  entities: [],
  totalPages: 0,
  totalElements: 0,
  loading: false,
  fetchRequest: null,
};

interface SearchAction extends Action {
  payload: any;
}

export const createSearchReducer = (entityName: string, reducer?: ActionReducer<SearchState>) => {
  return function(state: SearchState = initialState, action: SearchAction): SearchState {
    switch (action.type) {
      case `[${entityName}] Search`: {
        const fetchRequest: FetchRequest = action.payload;

        return Object.assign({}, state, {
          fetchRequest,
          loading: true,
          entities: [],
        });
      }

      case `[${entityName}] Search Complete`: {
        const searchResult: SearchResult = action.payload;

        return Object.assign({}, state, {
          entities: searchResult.elements,
          totalElements: searchResult.totalElements,
          totalPages: searchResult.totalPages,
          loading: false,
        });
      }

      default: {
        // delegate to wrapped reducer
        if (reducer) {
          return reducer(state, action);
        }
        return state;
      }
    }
  };
};

export const getSearchEntities = (state: SearchState) => state.entities;
export const getSearchTotalElements = (state: SearchState) => state.totalElements;
export const getSearchTotalPages = (state: SearchState) => state.totalPages;
export const getSearchLoading = (state: SearchState) => state.loading;

export const getSearchResult = createSelector(
  getSearchEntities,
  getSearchTotalElements,
  getSearchTotalPages,
  (elements, totalElements, totalPages) => {
    return {
      elements,
      totalElements,
      totalPages,
    };
  },
);
