import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../../services/customer/domain/customer.model';
import { Catalog } from '../../../services/catalog/domain/catalog.model';
import * as fromCustomers from '../store';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CustomerService } from '../../../services/customer/customer.service';
import { Observable } from 'rxjs';
import { tap, filter, flatMap } from 'rxjs/operators';

interface CustomDetailField {
  label: string;
  value: string;
}

@Component({
  templateUrl: './customer.detail.component.html',
  styleUrls: ['./customer.detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  portrait: Blob;

  private customerSubscription: Subscription;

  customer: Customer;

  catalog$: Observable<Catalog>;

  isCustomerActive: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromCustomers.State>,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.customerSubscription = this.store
      .select(fromCustomers.getSelectedCustomer)
      .pipe(
        filter(customer => !!customer),
        tap(customer => (this.customer = customer)),
        tap(customer => (this.isCustomerActive = customer.currentState === 'ACTIVE')),
        flatMap(customer => this.customerService.getPortrait(customer.identifier)),
      )
      .subscribe(portrait => (this.portrait = portrait));

    this.catalog$ = this.store.select(fromCustomers.getCustomerCatalog);
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  changePortrait(): void {
    this.router.navigate(['portrait'], { relativeTo: this.route });
  }

  goToTasks(): void {
    this.router.navigate(['tasks'], { relativeTo: this.route });
  }
}
