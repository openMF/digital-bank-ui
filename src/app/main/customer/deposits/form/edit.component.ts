import { Component, OnInit, ViewChild } from '@angular/core';
import { DepositFormComponent } from './form.component';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { ProductInstance } from '../../../../services/depositAccount/domain/instance/product-instance.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromDeposits from '../store/index';
import { Store } from '@ngrx/store';
import * as fromCustomers from '../../store/index';
import { Observable } from 'rxjs/Observable';
import { UPDATE } from '../store/deposit.actions';

@Component({
  templateUrl: './edit.component.html',
})
export class DepositEditComponent implements OnInit {
  @ViewChild('form') formComponent: DepositFormComponent;

  customer$: Observable<Customer>;

  productInstance$: Observable<ProductInstance>;

  constructor(private router: Router, private route: ActivatedRoute, private depositsStore: Store<fromDeposits.State>) {}

  ngOnInit(): void {
    this.customer$ = this.depositsStore.select(fromCustomers.getSelectedCustomer);
    this.productInstance$ = this.depositsStore.select(fromDeposits.getSelectedDepositInstance);
  }

  onSave(productInstance: ProductInstance): void {
    this.depositsStore.dispatch({
      type: UPDATE,
      payload: {
        productInstance,
        activatedRoute: this.route,
      },
    });
  }

  onCancel(): void {
    this.navigateAway();
  }

  navigateAway(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
