import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IdentificationCard } from '../../../../../services/customer/domain/identification-card.model';
import { IdentityCardFormComponent } from './identity-card-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromCustomers from '../../../store/index';
import { Store } from '@ngrx/store';
import { CREATE, RESET_FORM } from '../../../store/identityCards/identity-cards.actions';
import { Error } from '../../../../../services/domain/error.model';
import { Customer } from '../../../../../services/customer/domain/customer.model';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './create.form.component.html',
})
export class CreateCustomerIdentificationCardFormComponent implements OnInit, OnDestroy {
  private formStateSubscription: Subscription;

  private customerSubscription: Subscription;

  private customer: Customer;

  @ViewChild('form') formComponent: IdentityCardFormComponent;

  identificationCard: IdentificationCard = {
    type: '',
    number: '',
    expirationDate: null,
  };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {}

  ngOnInit() {
    this.customerSubscription = this.store.select(fromCustomers.getSelectedCustomer).subscribe(customer => (this.customer = customer));

    this.formStateSubscription = this.store
      .select(fromCustomers.getCustomerIdentificationCardFormError)
      .pipe(filter((error: Error) => !!error))
      .subscribe((error: Error) => {
        this.formComponent.showNumberValidationError();
      });
  }

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();

    this.store.dispatch({ type: RESET_FORM });
  }

  onSave(identificationCard: IdentificationCard) {
    const customerId = this.customer.identifier;
    this.store.dispatch({
      type: CREATE,
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
