import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IdentificationCard } from '../../../../../services/customer/domain/identification-card.model';
import { Observable } from 'rxjs/Observable';
import * as fromCustomers from '../../../store/index';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UPDATE } from '../../../store/identityCards/identity-cards.actions';
import { Customer } from '../../../../../services/customer/domain/customer.model';

@Component({
  templateUrl: './edit.form.component.html',
})
export class EditCustomerIdentificationCardFormComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;

  private customer: Customer;

  identificationCard$: Observable<IdentificationCard>;

  constructor(private router: Router, private route: ActivatedRoute, private customersStore: Store<fromCustomers.State>) {}

  ngOnInit() {
    this.customerSubscription = this.customersStore
      .select(fromCustomers.getSelectedCustomer)
      .subscribe(customer => (this.customer = customer));

    this.identificationCard$ = this.customersStore.select(fromCustomers.getSelectedIdentificationCard);
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
  }

  onSave(identificationCard: IdentificationCard) {
    const customerId = this.customer.identifier;

    this.customersStore.dispatch({
      type: UPDATE,
      payload: {
        customerId,
        identificationCard,
        activatedRoute: this.route,
      },
    });
  }

  onCancel() {
    this.navigateAway();
  }

  navigateAway(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
