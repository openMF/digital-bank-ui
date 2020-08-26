import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../../../services/customer/domain/customer.model';
import * as fromCustomers from '../../store';
import { Store } from '@ngrx/store';
import { UPDATE } from '../../store/customer.actions';
import { Catalog } from '../../../../services/catalog/domain/catalog.model';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './edit.form.component.html',
})
export class EditCustomerFormComponent {
  customer$: Observable<Customer>;

  catalog$: Observable<Catalog>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromCustomers.State>) {
    this.catalog$ = store.select(fromCustomers.getCustomerCatalog);
    this.customer$ = store.select(fromCustomers.getSelectedCustomer);
  }

  onSave(customer: Customer) {
    this.store.dispatch({
      type: UPDATE,
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
