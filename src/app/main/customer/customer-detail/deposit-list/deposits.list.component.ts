import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FetchRequest } from '../../../../services/domain/paging/fetch-request.model';
import { SEARCH } from '../../store/deposit/deposit.actions';
import * as fromCustomers from '../../store';
import { filter } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomSelectorFilterComponent } from '../../helper/custom-filter.component';
import { CustomRenderComponent } from '../../helper/custom-render.component';

@Component({
  selector: 'ngx-customer-deposit-table',
  templateUrl: './deposits.list.component.html',
  styleUrls: ['./deposits.list.component.scss'],
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
        filter: {
          type: 'custom',
          component: CustomSelectorFilterComponent,
        },
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      openedOn: {
        title: 'Opened on',
        filter: false,
      },
      lastTransactionDate: {
        title: 'Last transaction',
        filter: false,
      },
    },
    mode: 'external',
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.store.select(fromCustomers.getDepositSearchResults).subscribe(depositsPage => this.setProductsData(depositsPage));

    this.customerSubscription = this.store
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
    this.store.dispatch({
      type: SEARCH,
      payload: {
        customerId: this.customer.identifier,
        fetchRequest: fetchRequest,
      },
    });
  }

  rowSelect(event: any): void {
    const product = event.data;
    this.router.navigate(['deposits/detail', product.accountIdentifier], { relativeTo: this.route });
  }
}
