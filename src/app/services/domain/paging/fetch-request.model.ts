import { Sort } from './sort.model';
import { Page } from './page.model';

export interface FetchRequest {
  searchTerm?: string;
  page?: Page;
  sort?: Sort;
}
