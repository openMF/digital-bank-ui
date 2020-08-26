import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../services/customer/domain/customer.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromDeposits from './store/index';
import { Store } from '@ngrx/store';
import { FetchRequest } from '../../../services/domain/paging/fetch-request.model';
import { SEARCH } from './store/deposit.actions';
import * as fromCustomers from '../store';
import { DatePipe } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-customer-deposit-table',
  templateUrl: './deposits.list.component.html',
  styleUrls: ['./deposits.list.component.scss'],
  providers: [DatePipe],
})
export class DepositsListComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;

  private customer: Customer;

  productInstancesData$: Observable<any>;

  /** Data source for table */
  source: LocalDataSource = new LocalDataSource();

  /** Deposit Product data */
  depositData: {
    products: any;
    totalPages: number;
    totalElements: number;
  };

  /** Loading property  */
  loading: any;

  /** Settings for smart-table */
  settings = {
    actions: false,
    columns: {
      productIdentifier: {
        title: 'Deposit product',
      },
      accountIdentifier: {
        title: 'Account identifier',
      },
      balance: {
        title: 'Balance',
      },
      state: {
        title: 'State',
      },
      openedOn: {
        title: 'Opened on',
      },
      lastTransactionDate: {
        title: 'Last transaction',
      },
    },
    mode: 'external',
  };

  constructor(private router: Router, private route: ActivatedRoute, private depositsStore: Store<fromDeposits.State>) {}

  ngOnInit(): void {
    this.depositsStore.select(fromDeposits.getDepositSearchResults).subscribe(depositsPage => this.setProductsData(depositsPage));

    this.customerSubscription = this.depositsStore
      .select(fromCustomers.getSelectedCustomer)
      .pipe(filter(customer => !!customer))
      .subscribe(customer => {
        this.customer = customer;
        this.fetchProductInstances();
      });
  }

  setProductsData(productsData: any) {
    this.depositData = productsData;
    this.source.load(productsData.deposits);
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  fetchProductInstances(fetchRequest?: FetchRequest): void {
    this.depositsStore.dispatch({
      type: SEARCH,
      payload: {
        customerId: this.customer.identifier,
        fetchRequest: fetchRequest,
      },
    });
  }

  rowSelect(event: any): void {
    const product = event.data;
    this.router.navigate(['deposit/detail', product.accountIdentifier], { relativeTo: this.route });
  }
}
