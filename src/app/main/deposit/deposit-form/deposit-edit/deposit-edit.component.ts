import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RESET_FORM, UPDATE } from '../../store/product.actions';
import * as fromDepositAccount from '../../store';
import { ProductDefinition } from '../../../../services/depositAccount/domain/definition/product-definition.model';
import { DepositFormComponent } from '../deposit-form.component';
import { CurrencyService } from '../../../../services/currency/currency.service';
import { DepositAccountService } from '../../../../services/depositAccount/deposit-account.service';
import { Currency } from '../../../../services/currency/domain/currency.model';
import { Action } from '../../../../services/depositAccount/domain/definition/action.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-deposit-edit',
  templateUrl: './deposit-edit.component.html',
  styleUrls: ['./deposit-edit.component.scss'],
})
export class DepositEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') formComponent: DepositFormComponent;

  definition$: Observable<ProductDefinition>;

  currencies: Observable<Currency[]>;

  actions: Observable<Action[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private depositStore: Store<fromDepositAccount.State>,
    private depositService: DepositAccountService,
    private currencyService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.currencies = this.currencyService.fetchCurrencies();
    this.actions = this.depositService.fetchActions();
    this.definition$ = this.depositStore.select(fromDepositAccount.getSelectedProduct);
  }

  ngOnDestroy(): void {
    this.depositStore.dispatch({ type: RESET_FORM });
  }

  onSave(productDefinition: ProductDefinition): void {
    this.depositStore.dispatch({
      type: UPDATE,
      payload: {
        productDefinition,
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
