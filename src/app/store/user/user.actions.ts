import { Action } from '@ngrx/store';
import { type } from '../util';
import { SearchResult } from '../../main/common/store/search.reducer';
import { FetchRequest } from '../../services/domain/paging/fetch-request.model';

export const SEARCH = type('[User] Search');
export const SEARCH_COMPLETE = type('[User] Search Complete');

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: FetchRequest) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: SearchResult) {}
}

export type Actions = SearchAction | SearchCompleteAction;
