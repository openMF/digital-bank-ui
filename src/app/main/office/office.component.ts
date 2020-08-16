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

@Component({
  selector: 'ngx-offices',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  pageSizes: number[] = [10, 15, 20];

  private currentPage: Page = {
    pageIndex: 0,
    size: this.pageSizes[0],
  };

  private currentSort: Sort = {
    sortColumn: 'identifier',
    sortDirection: 'ASC',
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

  searchTerm: string;

  lastFetchRequest: FetchRequest = {
    searchTerm: '',
    page: {
      pageIndex: 0,
      size: 10,
    },
    sort: {
      sortColumn: '',
      sortDirection: '',
    },
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromRoot.State>) {}

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
  page(pagingEvent: any): void {
    this.currentPage = {
      pageIndex: pagingEvent.page - 1,
      size: pagingEvent.pageSize,
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
