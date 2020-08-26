import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IdentificationCardScan } from '../../../../../../services/customer/domain/identification-card-scan.model';
import * as fromCustomers from '../../../../store/index';
import { Store } from '@ngrx/store';
import { IdentificationCardScanComponent, IdentityCardScanFormData } from './scan.form.component';
import { CREATE, RESET_FORM } from '../../../../store/identityCards/scans/scans.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Error } from '../../../../../../services/domain/error.model';
import { Subscription } from 'rxjs/Subscription';
import { IdentificationCard } from '../../../../../../services/customer/domain/identification-card.model';
import { Customer } from '../../../../../../services/customer/domain/customer.model';

@Component({
  templateUrl: './create.form.component.html',
})
export class CreateIdentificationCardScanComponent implements OnInit, OnDestroy {
  private customerSubscription: Subscription;

  private identificationCardSubscription: Subscription;

  customer: Customer;

  identificationCard: IdentificationCard;

  error$: Observable<Error>;

  @ViewChild('form') formComponent: IdentificationCardScanComponent;

  constructor(private router: Router, private route: ActivatedRoute, private customersStore: Store<fromCustomers.State>) {}

  ngOnInit(): void {
    this.error$ = this.customersStore.select(fromCustomers.getCustomerIdentificationCardScanFormError);

    this.customerSubscription = this.customersStore
      .select(fromCustomers.getSelectedCustomer)
      .subscribe(customer => (this.customer = customer));

    this.identificationCardSubscription = this.customersStore
      .select(fromCustomers.getSelectedIdentificationCard)
      .subscribe(identificationCard => (this.identificationCard = identificationCard));
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
    this.identificationCardSubscription.unsubscribe();
    this.customersStore.dispatch({ type: RESET_FORM });
  }

  onSave(formData: IdentityCardScanFormData): void {
    const scan: IdentificationCardScan = {
      identifier: formData.identifier,
      description: formData.description,
    };

    this.customersStore.dispatch({
      type: CREATE,
      payload: {
        customerIdentifier: this.customer.identifier,
        identificationCardNumber: this.identificationCard.number,
        scan,
        file: formData.file,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
