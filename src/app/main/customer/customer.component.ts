import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FetchRequest } from '../../services/domain/paging/fetch-request.model';
import * as fromRoot from '../../store';
import { SEARCH } from '../../store/customer/customer.actions';
import { Store } from '@ngrx/store';
import { FimsValidators } from '../common/validator/validators';
import { LocalDataSource } from 'ng2-smart-table';
import { Page } from '../../services/domain/paging/page.model';
import { Sort } from '../../services/domain/paging/sort.model';
import { CustomSelectorFilterComponent } from './helper/custom-filter.component';
import { CustomRenderComponent } from './helper/custom-render.component';
import { CustomDateRenderComponent } from './helper/custom-date-render.component';
import { NbSearchService } from '@nebular/theme';

export interface TableFetchRequest {
  page: Page;
  sort: Sort;
}

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
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

  lastFetchRequest: FetchRequest = {
    searchTerm: '',
    page: this.currentPage,
    sort: this.currentSort,
  };

  /** Customer data */
  customerData: {
    customers: any;
    totalPages: number;
    totalElements: number;
  };

  /** Loading property  */
  loading: any;

  searchTerm: string;

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      identifier: {
        title: 'ID',
        compareFunction: FimsValidators.compareFunction,
      },
      givenName: {
        title: 'First Name',
        compareFunction: FimsValidators.compareFunction,
      },
      surname: {
        title: 'Last Name',
        compareFunction: FimsValidators.compareFunction,
      },
      currentState: {
        title: 'Current status',
        filter: {
          type: 'custom',
          component: CustomSelectorFilterComponent,
        },
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      lastModifiedOn: {
        title: 'Last Modified',
        filter: false,
        type: 'custom',
        renderComponent: CustomDateRenderComponent,
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
    this.store.select(fromRoot.getCustomerSearchResults).subscribe(customerData => this.setCustomerData(customerData));
    this.store.select(fromRoot.getCustomerSearchLoading).subscribe(loading => (this.loading = loading));
    this.route.queryParams.subscribe((params: Params) => {
      this.searchTerm = params['term'];
      this.fetchCustomers();
    });

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
      this.fetchCustomers();
    });
  }

  setCustomerData(customerData: any) {
    this.customerData = customerData;
    this.source.load(customerData.customers);
  }

  /** Search event  */
  search(event: any): void {
    this.searchTerm = event.target.value;
    this.fetchCustomers();
  }

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
    return this.pageIndex === this.customerData.totalPages - 1;
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
    this.onPageChange(this.customerData.totalPages - 1);
  }

  onPageChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.currentPage = {
      pageIndex: pageIndex,
      size: this.perPage,
    };
    this.fetch();
  }

  /** Sort event  */
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
    this.fetchCustomers(fetchRequest);
  }

  /** Dispatch Search Action  */
  fetchCustomers(fetchRequest?: any): void {
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
  onCustomerRowSelect(event: any): void {
    console.log(event.data);
    const customer = event.data;
    this.router.navigate(['detail', customer.identifier], { relativeTo: this.route });
  }

  onCustomAction(event: any): void {
    const customer = event.data;
    this.router.navigate(['detail', customer.identifier], { relativeTo: this.route });
  }
}
