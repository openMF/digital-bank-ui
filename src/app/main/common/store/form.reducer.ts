import { Action, ActionReducer } from '@ngrx/store';
import { Error } from '../../../services/domain/error.model';

export interface FormState {
  error?: Error;
}

interface FormAction extends Action {
  payload: any;
}

export const initialState: FormState = {};

export const createFormReducer = (resource: string, reducer?: ActionReducer<FormState>) => {
  return function(state: FormState = initialState, action: FormAction): FormState {
    switch (action.type) {
      case `[${resource}] Create Fail`:
      case `[${resource}] Update Fail`: {
        return Object.assign({}, state, {
          error: action.payload,
        });
      }

      case `[${resource}] Reset Form`:
      case `[${resource}] Create Success`:
      case `[${resource}] Update Success`: {
        return initialState;
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

export const getFormError = (formState: FormState) => formState.error;
