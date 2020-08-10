import { HttpParams } from '@angular/common/http';
import { FetchRequest } from './fetch-request.model';
import { Page } from './page.model';
import { Sort } from './sort.model';

export function buildSearchParams(fetchRequest?: FetchRequest): HttpParams {
  let params = new HttpParams();

  fetchRequest = fetchRequest || {};

  const page: Page = fetchRequest.page || { pageIndex: 0, size: 10 };
  const sort: Sort = fetchRequest.sort || { sortColumn: '', sortDirection: '' };

  if (fetchRequest.searchTerm) params = params.append('term', fetchRequest.searchTerm);

  if (page.pageIndex !== undefined) params = params.append('pageIndex', page.pageIndex.toString());

  if (page.size) params = params.append('size', page.size.toString());

  if (sort.sortColumn) params = params.append('sortColumn', sort.sortColumn);

  if (sort.sortDirection) params = params.append('sortDirection', sort.sortDirection);

  return params;
}

export function buildDateRangeParam(startDate: string, endDate: string): string {
  return `${startDate}..${endDate}`;
}
