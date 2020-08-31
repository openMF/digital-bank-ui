import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FetchRequest } from '../../services/domain/paging/fetch-request.model';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';
import { SEARCH } from '../../store/office/office.actions';
import { FimsValidators } from '../common/validator/validators';
import { LocalDataSource } from 'ng2-smart-table';
import { Page } from '../../services/domain/paging/page.model';
import { Sort } from '../../services/domain/paging/sort.model';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'ngx-offices',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  pageSizes: number[] = [10, 15, 20];
  perPage: number = this.pageSizes[0];
  pageIndex: number = 0;

  private currentPage: Page = {
    pageIndex: this.pageIndex,
    size: this.perPage,
  };

  private currentSort: Sort = {
    sortColumn: 'identifier',
    sortDirection: 'ASC',
  };

  searchTerm: string;

  lastFetchRequest: FetchRequest = {
    searchTerm: '',
    page: this.currentPage,
    sort: this.currentSort,
  };

  /** Office data */
  officesData: {
    offices: any;
    totalPages: number;
    totalElements: number;
  };

  /** Loading property  */
  loading: any;

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
        compareFunction: FimsValidators.compareFunction,
      },
      name: {
        title: 'Name',
        compareFunction: FimsValidators.compareFunction,
      },
      description: {
        title: 'Description',
        compareFunction: FimsValidators.compareFunction,
      },
    },
    mode: 'external',
    pager: {
      display: false,
    },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private searchService: NbSearchService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchTerm = params['term'];
      this.fetchOffices();
    });
    this.store.select(fromRoot.getOfficeSearchLoading).subscribe(loading => (this.loading = loading));
    this.store.select(fromRoot.getOfficeSearchResults).subscribe(officesData => this.setOfficesData(officesData));

    this.source.onChanged().subscribe(change => {
      if (change.action === 'sort') {
        const sortField = change.sort[0].field;
        const sortDirection = change.sort[0].direction;
        this.sortChanged(sortDirection, sortField);
      }
    });

    /** Search event  */
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.searchTerm = data.term;
      this.fetchOffices();
    });
  }

  /**
   * Initialise offices data
   */
  setOfficesData(officesData: any) {
    this.officesData = officesData;
    this.source.load(officesData.offices);
  }

  search(event: any): void {
    this.searchTerm = event.target.value;
    this.fetchOffices();
  }

  /** Paging and sort events  */
  onPageSizeChange(pageSize: number) {
    this.perPage = pageSize;
    this.currentPage = {
      pageIndex: 0,
      size: pageSize,
    };
    this.fetch();
  }

  get ifFirstPage() {
    return this.pageIndex === 0;
  }

  get ifLastPage() {
    return this.pageIndex === this.officesData.totalPages - 1;
  }

  skipBack() {
    this.onPageChange(0);
  }

  movePrev() {
    this.onPageChange(this.pageIndex - 1);
  }

  moveForward() {
    this.onPageChange(this.pageIndex + 1);
  }

  skipEnd() {
    this.onPageChange(this.officesData.totalPages - 1);
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.currentPage = {
      pageIndex: pageIndex,
      size: this.perPage,
    };
    this.fetch();
  }

  sortChanged(sortDirection: string, sortColumn: string): void {
    sortDirection = sortDirection.toUpperCase();
    this.currentSort = {
      sortDirection: sortDirection,
      sortColumn: sortColumn,
    };
    this.fetch();
  }

  private fetch() {
    const fetchRequest: FetchRequest = {
      page: this.currentPage,
      sort: this.currentSort,
    };
    this.fetchOffices(fetchRequest);
  }

  /**
   * Dispatch search action
   */
  fetchOffices(fetchRequest?: any): void {
    if (fetchRequest) {
      this.lastFetchRequest = fetchRequest;
    }
    const searchTerm = this.searchTerm;
    this.lastFetchRequest = {
      ...this.lastFetchRequest,
      searchTerm,
    };
    this.store.dispatch({ type: SEARCH, payload: this.lastFetchRequest });
  }

  /** Customer row select event  */
  onOfficeRowSelect(event: any): void {
    const office = event.data;
    this.router.navigate(['detail', office.identifier], { relativeTo: this.route });
  }
}
