import { Component, OnInit, ViewChild } from '@angular/core';
import { DepositFormComponent } from './form.component';
import { Customer } from '../../../../services/customer/domain/customer.model';
import { ProductInstance } from '../../../../services/depositAccount/domain/instance/product-instance.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CREATE } from '../store/deposit.actions';
import * as fromCustomers from '../../store/index';
import { DepositAccountService } from '../../../../services/depositAccount/deposit-account.service';
import { Observable } from 'rxjs/Observable';
import { ProductDefinition } from '../../../../services/depositAccount/domain/definition/product-definition.model';
import { filter, map } from 'rxjs/operators';

@Component({
  templateUrl: './create.component.html',
})
export class DepositCreateComponent implements OnInit {
  @ViewChild('form') formComponent: DepositFormComponent;

  customer$: Observable<Customer>;

  productInstance: ProductInstance = {
    customerIdentifier: '',
    productIdentifier: '',
  };

  productDefinitions$: Observable<ProductDefinition[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private depositsStore: Store<fromCustomers.State>,
    private depositService: DepositAccountService,
  ) {}

  ngOnInit(): void {
    this.customer$ = this.depositsStore.select(fromCustomers.getSelectedCustomer).pipe(filter(customer => !!customer));

    this.productDefinitions$ = this.depositService
      .fetchProductDefinitions()
      .pipe(map(productDefinitions => productDefinitions.filter(definition => definition.active)));
  }

  onSave(productInstance: ProductInstance): void {
    this.depositsStore.dispatch({
      type: CREATE,
      payload: {
        productInstance: productInstance,
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
