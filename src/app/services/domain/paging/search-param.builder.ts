import { HttpParams } from '@angular/common/http';
import { FetchRequest } from './fetch-request.model';
import { Page } from './page.model';
import { Sort } from './sort.model';

export function buildSearchParams(fetchRequest?: FetchRequest): HttpParams {
  const params = new HttpParams();

  fetchRequest = fetchRequest || {};

  const page: Page = fetchRequest.page || { pageIndex: 0, size: 10 };
  const sort: Sort = fetchRequest.sort || { sortColumn: '', sortDirection: '' };

  params.append('term', fetchRequest.searchTerm ? fetchRequest.searchTerm : undefined);

  params.append('pageIndex', page.pageIndex !== undefined ? page.pageIndex.toString() : undefined);
  params.append('size', page.size ? page.size.toString() : undefined);

  params.append('sortColumn', sort.sortColumn ? sort.sortColumn : undefined);
  params.append('sortDirection', sort.sortDirection ? sort.sortDirection : undefined);

  return params;
}

export function buildDateRangeParam(startDate: string, endDate: string): string {
  return `${startDate}..${endDate}`;
}
