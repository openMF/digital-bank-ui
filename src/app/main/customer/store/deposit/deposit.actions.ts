import { type } from '../../../../store/util';
import { FetchRequest } from '../../../../services/domain/paging/fetch-request.model';
import { Action } from '@ngrx/store';
import { SearchResult } from '../../../common/store/search.reducer';

export const SEARCH = type('[Deposit] Search');
export const SEARCH_COMPLETE = type('[Deposit] Search Complete');

export interface SearchProductInstancePayload {
  customerId: string;
  fetchRequest: FetchRequest;
}
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: SearchProductInstancePayload) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: SearchResult) {}
}

export type Actions = SearchAction | SearchCompleteAction;
