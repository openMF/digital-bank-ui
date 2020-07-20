import { Action, ActionReducer } from '@ngrx/store';
import { createSelector } from 'reselect';
import { RoutePayload } from './route-payload';

export interface Resource {
  identifier: string;
}

export interface LoadResourcePayload {
  resource: any;
}

export interface SelectResourcePayload {
  selectedId: string;
}

export interface CreateResourceSuccessPayload extends RoutePayload {
  resource: any;
}

export interface UpdateResourceSuccessPayload extends RoutePayload {
  resource: any;
}

export interface DeleteResourceSuccessPayload extends RoutePayload {
  resource: any;
}

export interface ResourceState {
  ids: string[];
  entities: { [id: string]: any };
  selectedId: string | null;
  loadedAt: { [id: string]: number };
}

const initialState: ResourceState = {
  ids: [],
  entities: {},
  loadedAt: {},
  selectedId: null,
};

interface ResourceAction extends Action {
  payload: any;
}

export const createResourceReducer = (
  resourceId: string,
  reducer?: ActionReducer<ResourceState>,
  identifierName: string = 'identifier',
) => {
  const identifier = (resource: any) => resource[identifierName];

  return function(state: ResourceState = initialState, action: ResourceAction): ResourceState {
    switch (action.type) {
      case `[${resourceId}] Load`: {
        const resource = action.payload.resource;

        const newIds = state.ids.filter(id => id !== identifier(resource));

        return {
          ids: [...newIds, identifier(resource)],
          entities: Object.assign({}, state.entities, {
            [identifier(resource)]: resource,
          }),
          selectedId: state.selectedId,
          loadedAt: Object.assign({}, state.entities, {
            [identifier(resource)]: Date.now(),
          }),
        };
      }

      case `[${resourceId}] Select`: {
        return Object.assign({}, state, {
          selectedId: action.payload,
        });
      }

      case `[${resourceId}] Create Success`: {
        const resource = action.payload.resource;

        return {
          ids: [...state.ids, identifier(resource)],
          entities: Object.assign({}, state.entities, {
            [identifier(resource)]: resource,
          }),
          selectedId: state.selectedId,
          loadedAt: state.loadedAt,
        };
      }

      case `[${resourceId}] Update Success`: {
        const resource = action.payload.resource;

        return {
          ids: state.ids,
          entities: Object.assign({}, state.entities, {
            [identifier(resource)]: resource,
          }),
          selectedId: state.selectedId,
          loadedAt: state.loadedAt,
        };
      }

      case `[${resourceId}] Delete Success`: {
        const resource = action.payload.resource;

        const newIds = state.ids.filter(id => id !== identifier(resource));

        const newEntities = newIds.reduce((entities: { [id: string]: any }, id: string) => {
          const entity = state.entities[id];
          return Object.assign(entities, {
            [identifier(entity)]: entity,
          });
        }, {});

        const newLoadedAt = newIds.reduce((entities: { [id: string]: any }, id: string) => {
          const loadedAt = state.loadedAt[id];
          return Object.assign(entities, {
            [id]: loadedAt,
          });
        }, {});

        return {
          ids: [...newIds],
          entities: newEntities,
          loadedAt: newLoadedAt,
          selectedId: state.selectedId,
        };
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

export const getResourceEntities = (cacheState: ResourceState) => cacheState.entities;
export const getResourceLoadedAt = (cacheState: ResourceState) => cacheState.loadedAt;
export const getResourceIds = (cacheState: ResourceState) => cacheState.ids;
export const getResourceSelectedId = (cacheState: ResourceState) => cacheState.selectedId;

export const getResourceSelected = createSelector(getResourceEntities, getResourceSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getResourceAll = createSelector(getResourceEntities, getResourceIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
