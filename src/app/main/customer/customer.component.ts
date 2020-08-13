import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FetchRequest } from '../../services/domain/paging/fetch-request.model';
import { Customer } from '../../services/customer/domain/customer.model';
import * as fromRoot from '../../store';
import { SEARCH } from '../../store/customer/customer.actions';
import { Store } from '@ngrx/store';
import { FimsValidators } from '../common/validator/validators';
import { LocalDataSource } from 'ng2-smart-table';
import { Page } from '../../services/domain/paging/page.model';
import { Sort } from '../../services/domain/paging/sort.model';
import { CustomSelectorFilterComponent } from './helper/custom-filter.component';

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

  private currentPage: Page = {
    pageIndex: 0,
    size: this.pageSizes[0],
  };

  private currentSort: Sort = {
    sortColumn: 'identifier',
    sortDirection: 'ASC',
  };

  /** Customer data */
  customerData: {
    customers: any;
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
      },
    },
    // pager: {
    //   display: true,
    //   perPage: 10,
    // },
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
  }

  setCustomerData(customerData: any) {
    this.customerData = customerData;
    this.source.load(customerData.customers);
  }

  search(event: any): void {
    this.searchTerm = event.target.value;
    this.fetchCustomers();
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
  onCustomerRowSelect(customer: Customer): void {
    this.router.navigate(['detail', customer.identifier], { relativeTo: this.route });
  }
}
