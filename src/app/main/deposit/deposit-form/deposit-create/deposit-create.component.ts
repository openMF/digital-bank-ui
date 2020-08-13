import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromDepositAccount from '../../store';
import { CREATE, RESET_FORM } from '../../store/product.actions';
import { Subscription } from 'rxjs/Subscription';
import { Error } from '../../../../services/domain/error.model';
import { ProductDefinition } from '../../../../services/depositAccount/domain/definition/product-definition.model';
import { DepositFormComponent } from '../deposit-form.component';
import { CurrencyService } from '../../../../services/currency/currency.service';
import { DepositAccountService } from '../../../../services/depositAccount/deposit-account.service';
import { Currency } from '../../../../services/currency/domain/currency.model';
import { Action } from '../../../../services/depositAccount/domain/definition/action.model';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ngx-deposit-create',
  templateUrl: './deposit-create.component.html',
  styleUrls: ['./deposit-create.component.scss'],
})
export class DepositCreateComponent implements OnInit, OnDestroy {
  private formStateSubscription: Subscription;

  @ViewChild('form') formComponent: DepositFormComponent;

  definition: ProductDefinition = {
    type: 'CHECKING',
    identifier: '',
    name: '',
    interest: 0,
    charges: [],
    currency: {
      code: 'USD',
      name: '',
      scale: 2,
      sign: '',
    },
    flexible: false,
    minimumBalance: 0,
    cashAccountIdentifier: '',
    expenseAccountIdentifier: '',
    term: {
      interestPayable: 'ANNUALLY',
    },
  };

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

    this.formStateSubscription = this.depositStore
      .select(fromDepositAccount.getProductFormError)
      .pipe(filter((error: Error) => !!error))
      .subscribe((error: Error) => {
        const detailForm = this.formComponent.productForm;
        const errors = detailForm.get('identifier').errors || {};
        errors['unique'] = true;
        detailForm.get('identifier').setErrors(errors);
      });
  }

  ngOnDestroy(): void {
    this.formStateSubscription.unsubscribe();

    this.depositStore.dispatch({ type: RESET_FORM });
  }

  onSave(productDefinition: ProductDefinition): void {
    this.depositStore.dispatch({
      type: CREATE,
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
