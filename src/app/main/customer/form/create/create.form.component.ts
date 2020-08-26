import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { CustomerFormComponent } from '../form.component';
import * as fromCustomers from '../../store';
import { Error } from '../../../../services/domain/error.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CREATE, RESET_FORM } from '../../store/customer.actions';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './create.form.component.html',
})
export class CreateCustomerFormComponent implements OnInit, OnDestroy {
  private formStateSubscription: Subscription;

  @ViewChild('form') formComponent: CustomerFormComponent;

  customer: Customer = {
    identifier: '',
    type: 'PERSON',
    givenName: '',
    surname: '',
    address: {
      street: '',
      city: '',
      countryCode: '',
      country: '',
    },
    member: true,
    dateOfBirth: undefined,
    contactDetails: [],
    customValues: [],
  };

  catalog$: Observable<Catalog>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {
    this.catalog$ = store.select(fromCustomers.getCustomerCatalog);
  }

  ngOnInit() {
    this.formStateSubscription = this.store
      .select(fromCustomers.getCustomerFormError)
      .pipe(filter((error: Error) => !!error))
      .subscribe((error: Error) => this.formComponent.showIdentifierValidationError());
  }

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();

    this.store.dispatch({ type: RESET_FORM });
  }

  onSave(customer: Customer) {
    this.store.dispatch({
      type: CREATE,
      payload: {
        customer,
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
